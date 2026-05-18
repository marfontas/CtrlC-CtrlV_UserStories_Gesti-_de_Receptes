import { useState } from 'react'

export default function App() {
  const [receptes] = useState([
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

  return (
    <div className="app-container">
      <header>
        <h1>Gestió de Receptes</h1>
        <p className="subtitol">Una petita llista de receptes d’exemple per començar.</p>
      </header>

      <main>
        {receptes.map((recepta, index) => (
          <article className="recepta-card" key={index}>
            <h2>{recepta.nom}</h2>
            <section>
              <h3>Ingredients</h3>
              <ul>
                {recepta.ingredients.map((ingredient, idx) => (
                  <li key={idx}>{ingredient}</li>
                ))}
              </ul>
            </section>
            <section>
              <h3>Passos</h3>
              <ol>
                {recepta.passos.map((pas, idx) => (
                  <li key={idx}>{pas}</li>
                ))}
              </ol>
            </section>
          </article>
        ))}
      </main>
    </div>
  )
}
