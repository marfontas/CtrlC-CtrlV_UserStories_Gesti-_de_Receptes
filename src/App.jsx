import { useState } from 'react'

export default function App() {
  const [receptes, setReceptes] = useState([
    {
      nom: 'Truita de patates',
      ingredients: ['3 ous', '2 patates mitjanes', '1 ceba petita', 'sal', 'oli d’oliva'],
      passos: [
        'Pelar i tallar les patates i la ceba a daus petits.',
        'Fregir-les a la paella amb oli fins que estiguin tendres.',
        'Batre els ous amb una mica de sal i afegir les patates.',
        'Cuinar la truita per ambdós costats fins que quedi daurada.'
      ]
    },
    {
      nom: 'Amanida mediterrània',
      ingredients: ['Enciam', 'Tomàquet', 'Cogombre', 'Olives negres', 'Formatge feta', 'Oli d’oliva', 'Vinagre'],
      passos: [
        'Netejar i tallar les verdures en trossos petits.',
        'Barrejar-hi les olives i el formatge feta.',
        'Amanir amb oli d’oliva, vinagre i una mica de sal.',
        'Servir fresca segons preferència.'
      ]
    },
    {
      nom: 'Brou de verdures',
      ingredients: ['Aigua', 'Pastanaga', 'Api', 'Ceba', 'Porro', 'Sal', 'Pebre'],
      passos: [
        'Posar totes les verdures netes i tallades en una cassola gran.',
        'Cobrir amb aigua i portar a ebullició.',
        'Deixar coure a foc lent durant 40 minuts.',
        'Colar el brou i servir calent.'
      ]
    }
  ])

  // Estados per al formulari
  const [nom, setNom] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [passos, setPassos] = useState('')
  const [missatge, setMissatge] = useState('')

  // Funció per afegir una nova recepta
  const afegirRecepta = (e) => {
    e.preventDefault()

    // Validar que el nom no estigui buit
    if (nom.trim() === '') {
      setMissatge('❌ El nom de la recepta és obligatori!')
      setTimeout(() => setMissatge(''), 3000)
      return
    }

    // Validar que hi hagi almenys un ingredient
    if (ingredients.trim() === '') {
      setMissatge('❌ Afegeix almenys un ingredient!')
      setTimeout(() => setMissatge(''), 3000)
      return
    }

    // Validar que hi hagi almenys un pas
    if (passos.trim() === '') {
      setMissatge('❌ Afegeix almenys un pas!')
      setTimeout(() => setMissatge(''), 3000)
      return
    }

    // Crear la nova recepta (dividint ingredients i passos per salts de línia)
    const novaRecepta = {
      nom: nom.trim(),
      ingredients: ingredients.trim().split('\n').filter(ing => ing.trim() !== ''),
      passos: passos.trim().split('\n').filter(pas => pas.trim() !== '')
    }

    // Afegir la recepta a la llista
    setReceptes([...receptes, novaRecepta])

    // Mostrar missatge de confirmació
    setMissatge('✅ Recepta afegida correctament!')

    // Netejar els camps del formulari
    setNom('')
    setIngredients('')
    setPassos('')

    // Esborrar el missatge després de 3 segons
    setTimeout(() => setMissatge(''), 3000)
  }

  return (
    <div className="app-container">
      <header>
        <h1>Gestió de Receptes</h1>
        <p className="subtitol">Una petita llista de receptes d’exemple per començar.</p>
      </header>

      {/* Formulari per afegir nova recepta */}
      <section className="formulari-section">
        <h2>➕ Afegir nova recepta</h2>
        <form onSubmit={afegirRecepta} className="formulari-recepta">
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

          <button type="submit" className="btn-enviar">Afegir recepta</button>
        </form>

        {/* Missatge de confirmació */}
        {missatge && <div className="missatge">{missatge}</div>}
      </section>

      {/* Llista de receptes */}
      <main>
        <h2>Receptes ({receptes.length})</h2>
        {receptes.length === 0 ? (
          <p className="sense-receptes">No hi ha receptes. Afegeix-ne una!</p>
        ) : (
          receptes.map((recepta, index) => (
            <article className="recepta-card" key={index}>
              <h3>{recepta.nom}</h3>
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
      </main>
    </div>
  )
}
