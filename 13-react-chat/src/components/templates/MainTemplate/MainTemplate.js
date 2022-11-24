// Templatki sa to reuzywalne layouty naszej aplikacji, zawierajace zazwyczaj nawigacje, footer i dynamiczna tresc

import Footer from "components/sections/Footer/Footer"
import Navigation from "components/sections/Navigation/Navigation"

function MainTemplate(props) {
  return (
    <div>
      <Navigation />

      {props.children}

      <Footer />
    </div>
  )
}

export default MainTemplate