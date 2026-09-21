import { useEffect, useState } from 'react'
import {
  addInfrastructure,
  checkHealth,
  getAula,
  getInstitution,
  updateInfrastructure,
} from './services/api'
import { mockAula, mockInstitution } from './data/mockAula'
import './App.css'

const infrastructureTypes = [
  'entrance',
  'automatic_door',
  'ramp',
  'stairs',
  'elevator',
  'emergency_exit',
  'accessible_toilet',
  'obstacle',
]

const typeLabels = Object.fromEntries(
  infrastructureTypes.map((type) => [
    type,
    type
      .split('_')
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join(' '),
  ]),
)

const spaces = [
  { id: 'main-entrance', name: 'Main Entrance', configured: true },
  { id: 'aula', name: 'Aula', configured: true },
  { id: 'floor-1', name: 'Floor 1', configured: false },
  { id: 'floor-2', name: 'Floor 2', configured: false },
]

function makeId(type, items) {
  const prefix = type.replaceAll('_', '-')
  let number = 1
  while (items.some((item) => item.id === `${prefix}-${number}`)) number += 1
  return `${prefix}-${number}`
}

function App() {
  const [view, setView] = useState('dashboard')
  const [institution, setInstitution] = useState(mockInstitution)
  const [aula, setAula] = useState(mockAula)
  const [dataMode, setDataMode] = useState('loading')
  const [notice, setNotice] = useState('')
  const [editingItem, setEditingItem] = useState(null)

  useEffect(() => {
    let active = true

    Promise.all([checkHealth(), getInstitution(), getAula()])
      .then(([, institutionData, aulaData]) => {
        if (!active) return
        setInstitution(institutionData)
        setAula(aulaData)
        setDataMode('live')
      })
      .catch((error) => {
        console.error('Backend unavailable:', error)
        if (!active) return
        setDataMode('demo')
        setNotice('Backend unavailable. Showing demo data.')
      })

    return () => {
      active = false
    }
  }, [])

  const navigate = (nextView) => {
    setNotice('')
    setEditingItem(null)
    setView(nextView)
  }

  const saveInfrastructure = async (item) => {
    setNotice('')

    if (dataMode !== 'live') {
      setAula((current) => ({
        ...current,
        infrastructure: editingItem
          ? current.infrastructure.map((existing) =>
              existing.id === item.id ? item : existing,
            )
          : [...current.infrastructure, item],
      }))
      setNotice(
        editingItem
          ? 'Demo item updated locally.'
          : 'Demo item added locally. It is not synchronized.',
      )
      setView('aula')
      setEditingItem(null)
      return
    }

    try {
      if (editingItem) {
        await updateInfrastructure(item.id, item)
      } else {
        await addInfrastructure(item)
      }
      setAula(await getAula())
      setNotice(editingItem ? 'Infrastructure updated.' : 'Infrastructure added.')
      setView('aula')
      setEditingItem(null)
    } catch (error) {
      console.error('Could not save infrastructure:', error)
      throw new Error(`Could not save infrastructure. ${error.message}`)
    }
  }

  const editItem = (item) => {
    setEditingItem(item)
    setView('form')
  }

  const saveScanSuggestions = async (confirmedItems) => {
    setNotice('')
    if (dataMode !== 'live') {
      setAula((current) => ({
        ...current,
        infrastructure: [...current.infrastructure, ...confirmedItems],
      }))
      setNotice('Confirmed demo suggestions were added locally. They are not synchronized.')
      setView('aula')
      return
    }

    try {
      for (const item of confirmedItems) {
        await addInfrastructure(item)
        setAula(await getAula())
      }
      setNotice(`${confirmedItems.length} confirmed suggestion${confirmedItems.length === 1 ? '' : 's'} saved.`)
      setView('aula')
    } catch (error) {
      console.error('Could not save scan suggestions:', error)
      throw new Error(`Could not save confirmed suggestions. ${error.message}`)
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" type="button" onClick={() => navigate('dashboard')}>
          <span className="brand-mark" aria-hidden="true">E</span>
          <span><strong>ECHO PATH</strong><small>Institution Portal</small></span>
        </button>
        <span className={`status status-${dataMode}`}>
          {dataMode === 'live'
            ? 'Live API'
            : dataMode === 'demo'
              ? 'Demo data'
              : 'Connecting…'}
        </span>
      </header>

      <main>
        {notice && <div className="notice" role="status">{notice}</div>}

        {view === 'dashboard' && (
          <Dashboard
            institution={institution}
            featureCount={aula.infrastructure.length}
            onManage={() => navigate('spaces')}
          />
        )}
        {view === 'spaces' && (
          <Spaces onBack={() => navigate('dashboard')} onOpenAula={() => navigate('aula')} />
        )}
        {view === 'aula' && (
          <AulaDetail
            aula={aula}
            onBack={() => navigate('spaces')}
            onAdd={() => navigate('form')}
            onEdit={editItem}
            onScan={() => navigate('scan')}
          />
        )}
        {view === 'form' && (
          <InfrastructureForm
            item={editingItem}
            items={aula.infrastructure}
            onCancel={() => navigate('aula')}
            onSave={saveInfrastructure}
          />
        )}
        {view === 'scan' && (
          <ScanSpace
            items={aula.infrastructure}
            onBack={() => navigate('aula')}
            onSave={saveScanSuggestions}
          />
        )}
      </main>
    </div>
  )
}

function PageHeading({ eyebrow, title, description, onBack, actions }) {
  return (
    <div className="page-heading">
      {onBack && <button className="back-button" type="button" onClick={onBack}>← Back</button>}
      <p className="eyebrow">{eyebrow}</p>
      <div className="heading-row">
        <div>
          <h1>{title}</h1>
          {description && <p className="muted">{description}</p>}
        </div>
        {actions && <div className="actions">{actions}</div>}
      </div>
    </div>
  )
}

function Dashboard({ institution, featureCount, onManage }) {
  return (
    <>
      <PageHeading
        eyebrow="Institution overview"
        title="Accessibility starts with reliable information."
        description="Manage the spaces and accessibility infrastructure visitors rely on."
      />
      <section className="institution-card">
        <div>
          <p className="eyebrow">Institution</p>
          <h2>Maastricht University</h2>
          <p>{institution.name.includes('School') ? 'School of Business and Economics' : institution.name}</p>
        </div>
        <button className="primary-button" type="button" onClick={onManage}>Manage Spaces →</button>
      </section>
      <section className="summary-grid" aria-label="Institution summary">
        <article><strong>2</strong><span>Configured Spaces</span></article>
        <article><strong>{featureCount}</strong><span>Aula Features</span></article>
        <article><strong>0</strong><span>Pending Suggestions</span></article>
      </section>
    </>
  )
}

function Spaces({ onBack, onOpenAula }) {
  return (
    <>
      <PageHeading
        eyebrow="Space management"
        title="Spaces"
        description="Select a configured space to manage its accessibility infrastructure."
        onBack={onBack}
      />
      <section className="space-list">
        {spaces.map((space) => (
          <article className="space-row" key={space.id}>
            <div>
              <h2>{space.name}</h2>
              <span className={space.configured ? 'configured' : 'not-configured'}>
                {space.configured ? '✓ Configured' : 'Not configured'}
              </span>
            </div>
            {space.id === 'aula' ? (
              <button className="secondary-button" type="button" onClick={onOpenAula}>
                Manage Aula →
              </button>
            ) : (
              <span className="muted">{space.configured ? 'Available' : 'Mapping required'}</span>
            )}
          </article>
        ))}
      </section>
    </>
  )
}

function AulaDetail({ aula, onBack, onAdd, onEdit, onScan }) {
  return (
    <>
      <PageHeading
        eyebrow="Ground floor · Configured"
        title="Aula"
        description="Accessibility Infrastructure"
        onBack={onBack}
        actions={
          <>
            <button className="secondary-button" type="button" onClick={onScan}>Scan Space</button>
            <button className="primary-button" type="button" onClick={onAdd}>+ Add Infrastructure</button>
          </>
        }
      />
      <section className="infrastructure-grid" aria-label="Accessibility infrastructure">
        {aula.infrastructure.map((item) => (
          <article className="infrastructure-card" key={item.id}>
            <div className="card-top">
              <span className="type-chip">{typeLabels[item.type]}</span>
              <span className={item.accessible ? 'accessible' : 'inaccessible'}>
                {item.accessible ? '✓ Accessible' : '⊘ Inaccessible'}
              </span>
            </div>
            <h2>{item.name}</h2>
            <dl>
              <div><dt>Location</dt><dd>{item.location || 'Not specified'}</dd></div>
              <div><dt>Notes</dt><dd>{item.notes || 'No notes'}</dd></div>
            </dl>
            <button className="text-button" type="button" onClick={() => onEdit(item)}>Edit</button>
          </article>
        ))}
      </section>
    </>
  )
}

function InfrastructureForm({ item, items, onCancel, onSave }) {
  const [form, setForm] = useState(
    item || {
      id: '',
      type: '',
      name: '',
      accessible: null,
      location: '',
      notes: '',
    },
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    const payload = {
      ...form,
      id: item?.id || makeId(form.type, items),
      accessible: form.accessible === true || form.accessible === 'true',
    }
    try {
      await onSave(payload)
    } catch (saveError) {
      setError(saveError.message)
      setSaving(false)
    }
  }

  return (
    <>
      <PageHeading
        eyebrow="Aula infrastructure"
        title={item ? 'Edit Infrastructure' : 'Add Infrastructure'}
        description={item ? `Editing ${item.id}` : 'Add a verified feature to the shared Aula data.'}
        onBack={onCancel}
      />
      <form className="infrastructure-form" onSubmit={submit}>
        {error && <div className="error" role="alert">{error}</div>}
        <label>Name <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label>Type
          <select required value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="">Select a type</option>
            {infrastructureTypes.map((type) => <option key={type} value={type}>{typeLabels[type]}</option>)}
          </select>
        </label>
        <fieldset>
          <legend>Accessible</legend>
          <label className="radio-label"><input required type="radio" name="accessible" value="true" checked={form.accessible === true || form.accessible === 'true'} onChange={(e) => setForm({ ...form, accessible: e.target.value })} /> Yes</label>
          <label className="radio-label"><input required type="radio" name="accessible" value="false" checked={form.accessible === false || form.accessible === 'false'} onChange={(e) => setForm({ ...form, accessible: e.target.value })} /> No</label>
        </fieldset>
        <label>Location <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></label>
        <label>Notes <textarea rows="4" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></label>
        <div className="form-actions">
          <button className="secondary-button" type="button" onClick={onCancel}>Cancel</button>
          <button className="primary-button" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save Infrastructure'}</button>
        </div>
      </form>
    </>
  )
}

function ScanSpace({ items, onBack, onSave }) {
  const [preview, setPreview] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview])

  const chooseImage = (event) => {
    const file = event.target.files[0]
    if (!file) return
    if (preview) URL.revokeObjectURL(preview)
    setPreview(URL.createObjectURL(file))
    const firstId = makeId('stairs', items)
    const secondId = makeId('entrance', [...items, { id: firstId }])
    const thirdId = makeId('automatic_door', [...items, { id: firstId }, { id: secondId }])
    setSuggestions([
      { id: firstId, type: 'stairs', name: 'Suggested Aula Stairs', accessible: false, location: 'front-right', notes: 'Demo suggestion from uploaded space image', decision: 'pending' },
      { id: secondId, type: 'entrance', name: 'Suggested Aula Entrance', accessible: true, location: 'front', notes: 'Demo suggestion from uploaded space image', decision: 'pending' },
      { id: thirdId, type: 'automatic_door', name: 'Suggested Automatic Door', accessible: true, location: 'rear', notes: 'Demo suggestion from uploaded space image', decision: 'pending' },
    ])
  }

  const decide = (id, decision) => {
    setSuggestions((current) => current.map((item) => item.id === id ? { ...item, decision } : item))
  }

  const save = async () => {
    const confirmed = suggestions
      .filter((item) => item.decision === 'confirmed')
      .map((item) => ({
        id: item.id,
        type: item.type,
        name: item.name,
        accessible: item.accessible,
        location: item.location,
        notes: item.notes,
      }))
    if (!confirmed.length) {
      setError('Confirm at least one suggestion before saving.')
      return
    }
    setSaving(true)
    setError('')
    try {
      await onSave(confirmed)
    } catch (saveError) {
      setError(saveError.message)
      setSaving(false)
    }
  }

  return (
    <>
      <PageHeading
        eyebrow="Demo workflow"
        title="Scan Space"
        description="Upload a space image, review deterministic demo suggestions, and confirm only verified features."
        onBack={onBack}
      />
      <section className="scan-panel">
        <label className="upload-zone">
          <strong>{preview ? 'Choose a different image' : 'Upload an Aula image'}</strong>
          <span>Camera or image library · JPG, PNG</span>
          <input type="file" accept="image/*" capture="environment" onChange={chooseImage} />
        </label>
        {preview && <img className="scan-preview" src={preview} alt="Uploaded Aula preview" />}
      </section>
      {error && <div className="error" role="alert">{error}</div>}
      {suggestions.length > 0 && (
        <section>
          <div className="suggestion-heading">
            <div><h2>Review suggestions</h2><p className="muted">Demo suggestions · Requires administrator confirmation</p></div>
            <button className="primary-button" type="button" disabled={saving} onClick={save}>{saving ? 'Saving…' : 'Save confirmed suggestions'}</button>
          </div>
          <div className="infrastructure-grid">
            {suggestions.map((item) => (
              <article className={`infrastructure-card decision-${item.decision}`} key={item.id}>
                <div className="card-top"><span className="type-chip">{typeLabels[item.type]}</span><span>{item.decision}</span></div>
                <h2>{item.name}</h2>
                <p>{item.location} · {item.accessible ? 'Accessible' : 'Inaccessible'}</p>
                <p className="muted">{item.notes}</p>
                <div className="card-actions">
                  <button className="confirm-button" type="button" onClick={() => decide(item.id, 'confirmed')}>Confirm</button>
                  <button className="reject-button" type="button" onClick={() => decide(item.id, 'rejected')}>Reject</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default App
