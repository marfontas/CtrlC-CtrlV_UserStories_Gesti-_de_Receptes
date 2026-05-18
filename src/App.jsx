import { useState, useEffect } from 'react'

// Receptes d'exemple per mostrar si no hi ha dades guardades
const RECEPTES_EXEMPLE = [
  {
    id: 'rec-1',
    nom: 'Truita de patates',
    ingredients: ['3 ous', '2 patates mitjanes', '1 ceba petita', 'sal', 'oli d\'oliva'],
    passos: [
      'Pelar i tallar les patates i la ceba a daus petits.',
      'Fregir-les a la paella amb oli fins que estiguin tendres.',
      'Batre els ous amb una mica de sal i afegir les patates.',
      'Cuinar la truita per ambdós costats fins que quedi daurada.'
    ]
  },
  {
    id: 'rec-2',
    nom: 'Amanida mediterrània',
    ingredients: ['Enciam', 'Tomàquet', 'Cogombre', 'Olives negres', 'Formatge feta', 'Oli d\'oliva', 'Vinagre'],
    passos: [
      'Netejar i tallar les verdures en trossos petits.',
      'Barrejar-hi les olives i el formatge feta.',
      'Amanir amb oli d\'oliva, vinagre i una mica de sal.',
      'Servir fresca segons preferència.'
    ]
  },
  {
    id: 'rec-3',
    nom: 'Brou de verdures',
    ingredients: ['Aigua', 'Pastanaga', 'Api', 'Ceba', 'Porro', 'Sal', 'Pebre'],
    passos: [
      'Posar totes les verdures netes i tallades en una cassola gran.',
      'Cobrir amb aigua i portar a ebullició.',
      'Deixar coure a foc lent durant 40 minuts.',
      'Colar el brou i servir calent.'
    ]
  }
]

const generarIdRecepta = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return Date.now().toString() + Math.random().toString(16).slice(2)
}

const inicialitzarReceptes = (receptesData) => receptesData.map((recepta) => ({
  ...recepta,
  id: recepta.id || generarIdRecepta()
}))

export default function App() {
  const [receptes, setReceptes] = useState([])
  const [anteriorReceptes, setAnteriorReceptes] = useState(null)

  // Estados per al formulari
  const [nom, setNom] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [passos, setPassos] = useState('')
  const [missatge, setMissatge] = useState('')
  const [editantId, setEditantId] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)

  // Estados per a la cerca
  const [termCerca, setTermCerca] = useState('')
  const [missatgeCerca, setMissatgeCerca] = useState('')

  // useEffect per carregar les receptes de localStorage quan es munti el component
  useEffect(() => {
    const receptesGuardades = localStorage.getItem('receptes')
    
    if (receptesGuardades) {
      // Si hi ha dades guardades, carrega-les
      try {
        setReceptes(inicialitzarReceptes(JSON.parse(receptesGuardades)))
      } catch (error) {
        console.error('Error carregant receptes de localStorage:', error)
        // Si hi ha un error, carrega les receptes d'exemple
        setReceptes(inicialitzarReceptes(RECEPTES_EXEMPLE))
      }
    } else {
      // Si no hi ha dades guardades, mostra les receptes d'exemple
      setReceptes(inicialitzarReceptes(RECEPTES_EXEMPLE))
    }
  }, []) // Només s'executa una vegada quan es munti

  // useEffect per guardar les receptes a localStorage cada vegada que canvien
  useEffect(() => {
    localStorage.setItem('receptes', JSON.stringify(receptes))
  }, [receptes]) // S'executa cada vegada que receptes canvia

  const guardarEstatAnterior = () => {
    setAnteriorReceptes(receptes)
  }

  const desferUltimaAccio = () => {
    if (!anteriorReceptes) {
      return
    }

    setReceptes(anteriorReceptes)
    setAnteriorReceptes(null)
    setNom('')
    setIngredients('')
    setPassos('')
    setEditantId(null)
    setIsEditMode(false)
    setMissatge('✅ Acció desfeta correctament')
  }

  // Funció per filtrar receptes segons el terme de cerca
  const filtrarReceptes = () => {
    if (termCerca.trim() === '') {
      return receptes
    }

    const termLower = termCerca.toLowerCase()
    return receptes.filter(recepta => {
      const nomCoincideix = recepta.nom.toLowerCase().includes(termLower)
      const ingredientCoincideix = recepta.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(termLower)
      )
      return nomCoincideix || ingredientCoincideix
    })
  }

  // Funció per netejar la cerca
  const netejarCerca = () => {
    setTermCerca('')
    setMissatgeCerca('🧹 Cerca neta! Mostrant totes les receptes.')
    setTimeout(() => setMissatgeCerca(''), 3000)
  }

  // Funció per afegir una nova recepta
  const afegirRecepta = (e) => {
    e.preventDefault()

    if (!validarFormulari()) {
      return
    }

    const novaRecepta = {
      id: generarIdRecepta(),
      nom: nom.trim(),
      ingredients: ingredients.trim().split('\n').filter(ing => ing.trim() !== ''),
      passos: passos.trim().split('\n').filter(pas => pas.trim() !== '')
    }

    guardarEstatAnterior()
    setReceptes([...receptes, novaRecepta])
    setMissatge('✅ Recepta afegida correctament!')
    netejarFormulari()
  }

  const editarRecepta = (id) => {
    const recepta = receptes.find((item) => item.id === id)
    if (!recepta) return

    setNom(recepta.nom)
    setIngredients(recepta.ingredients.join('\n'))
    setPassos(recepta.passos.join('\n'))
    setEditantId(id)
    setIsEditMode(true)
    setMissatge('')
  }

  const eliminarRecepta = (id) => {
    const confirmar = window.confirm('Segur que vols eliminar aquesta recepta?')
    if (!confirmar) {
      return
    }

    guardarEstatAnterior()
    setReceptes(receptes.filter((item) => item.id !== id))
    setMissatge('✅ Recepta eliminada correctament')

    if (isEditMode && editantId === id) {
      cancelarEdicio()
    }
  }

  const guardarCanvis = (e) => {
    e.preventDefault()

    if (!validarFormulari()) {
      return
    }

    const receptaActualitzada = {
      id: editantId,
      nom: nom.trim(),
      ingredients: ingredients.trim().split('\n').filter(ing => ing.trim() !== ''),
      passos: passos.trim().split('\n').filter(pas => pas.trim() !== '')
    }

    guardarEstatAnterior()
    setReceptes(receptes.map((item) => item.id === editantId ? receptaActualitzada : item))
    setMissatge('✅ Recepta actualitzada correctament!')
    netejarFormulari()
    setEditantId(null)
    setIsEditMode(false)
  }

  const cancelarEdicio = () => {
    netejarFormulari()
    setEditantId(null)
    setIsEditMode(false)
    setMissatge('')
  }

  const validarFormulari = () => {
    if (nom.trim() === '') {
      setMissatge('❌ El nom de la recepta és obligatori!')
      setTimeout(() => setMissatge(''), 3000)
      return false
    }

    if (ingredients.trim() === '') {
      setMissatge('❌ Afegeix almenys un ingredient!')
      setTimeout(() => setMissatge(''), 3000)
      return false
    }

    if (passos.trim() === '') {
      setMissatge('❌ Afegeix almenys un pas!')
      setTimeout(() => setMissatge(''), 3000)
      return false
    }

    return true
  }

  const netejarFormulari = () => {
    setNom('')
    setIngredients('')
    setPassos('')
  }

  const handleSubmit = (e) => {
    if (isEditMode) {
      guardarCanvis(e)
    } else {
      afegirRecepta(e)
    }
  }

  const missatgeClass = missatge.startsWith('❌') ? 'missatge missatge-error' : 'missatge missatge-success'

  return (
    <div className="app-container">
      <header>
        <h1>Gestió de Receptes</h1>
        <p className="subtitol">Una petita llista de receptes d'exemple per començar.</p>
      </header>

      <div className="panell-superior">
        <section className="formulari-section">
          <h2>{isEditMode ? '✏️ Editar recepta' : '➕ Afegir nova recepta'}</h2>
          <form onSubmit={handleSubmit} className="formulari-recepta">
            <div className="form-group">
              <label htmlFor="nom">Nom de la recepta:</label>
              <input
                id="nom"
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Ex: Pasta a la carbonara"
              />
            </div>

          <div className="form-group">
            <label htmlFor="ingredients">Ingredients (un per línia):</label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Ex: 400g de pasta, 3 ous, 100g de bacon"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="passos">Passos (un per línia):</label>
            <textarea
              id="passos"
              value={passos}
              onChange={(e) => setPassos(e.target.value)}
              placeholder="Ex: Coure la pasta, Preparar la salsa, Mesclar i servir"
              rows="4"
            />
          </div>

          <div className="formulari-accions">
            <button type="submit" className="btn-enviar">
              {isEditMode ? 'Guardar canvis' : 'Afegir recepta'}
            </button>
            {isEditMode && (
              <button type="button" className="btn-cancelar" onClick={cancelarEdicio}>
                Cancel·lar edició
              </button>
            )}
          </div>
        </form>

        {/* Missatge de confirmació */}
        {missatge && <div className={missatgeClass}>{missatge}</div>}
      </section>

      {/* Secció de cerca */}
      <section className="cerca-section">
        <h2>🔍 Cercar receptes</h2>
        <div className="cerca-container">
          <input
            type="text"
            value={termCerca}
            onChange={(e) => setTermCerca(e.target.value)}
            placeholder="Cerca per nom o ingredient..."
            className="input-cerca"
          />
          <button 
            onClick={netejarCerca}
            className="btn-netejar"
            disabled={termCerca === ''}
          >
            Netejar cerca
          </button>
        </div>
        <div className="cerca-accions">
          {anteriorReceptes && (
            <button
              type="button"
              className="btn-desfer"
              onClick={desferUltimaAccio}
            >
              Desfer última acció
            </button>
          )}
        </div>
        {missatgeCerca && <div className="missatge missatge-info">{missatgeCerca}</div>}
      </section>
      </div>

      {/* Llista de receptes */}
      <main>
        {(() => {
          const receptesFiltrades = filtrarReceptes()
          return (
            <>
              <h2>Receptes ({receptesFiltrades.length})</h2>
              {receptesFiltrades.length === 0 ? (
                termCerca === '' ? (
                  <p className="sense-receptes">No hi ha receptes. Afegeix-ne una!</p>
                ) : (
                  <p className="sense-receptes">❌ No s'han trobat receptes.</p>
                )
              ) : (
                receptesFiltrades.map((recepta) => (
            <article className="recepta-card" key={recepta.id}>
              <div className="recepta-card-header">
                <h3>{recepta.nom}</h3>
                <div className="recepta-card-actions">
                  <button type="button" className="btn-editar" onClick={() => editarRecepta(recepta.id)}>
                    Editar
                  </button>
                  <button type="button" className="btn-eliminar" onClick={() => eliminarRecepta(recepta.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
              <section>
                <h4>Ingredients</h4>
                <ul>
                  {recepta.ingredients.map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h4>Passos</h4>
                <ol>
                  {recepta.passos.map((pas, idx) => (
                    <li key={idx}>{pas}</li>
                  ))}
                </ol>
              </section>
                </article>
              ))
              )}
            </>
          )
        })()}
      </main>
    </div>
  )
}
