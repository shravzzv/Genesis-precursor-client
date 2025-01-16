import '../styles/Landing.css'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <main className='landing'>
      <div className='hero'>
        <h1>Genesis: Transform yourself into your best self</h1>
        <p>
          Join us on a journey of self-discovery and personal growth. At
          Genesis, we provide the tools and support you need to unlock your full
          potential and become the best version of yourself.
        </p>
        <div className='buttons'>
          <button>
            <Link to={'/signup'}>Signup</Link>
          </button>
          <button>
            <Link to={'/signin'}>Signin</Link>
          </button>
        </div>
      </div>

      <section className='goals'>
        <div className='text'>
          <h2>Goals</h2>
          <p>
            Goals are essential for personal and professional growth. They
            provide direction and motivation, helping you focus on what truly
            matters. By breaking down goals into simple, manageable tasks with
            the help of generative AI, you can create a clear roadmap to
            success. This approach not only makes the process less overwhelming
            but also allows for more efficient progress tracking and adjustments
            along the way.
          </p>
        </div>
        <div className='image'>
          <img
            src='https://images.unsplash.com/photo-1506784926709-22f1ec395907?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='Goals'
          />
        </div>
      </section>

      <section className='todos'>
        <div className='text'>
          <h2>Todos</h2>
          <p>
            Todos are a great way to keep track of tasks and stay organized.
            Completing them not only gives a sense of accomplishment but also
            helps in maintaining productivity. By breaking down larger goals
            into smaller, manageable tasks, you can make steady progress and
            achieve your objectives more efficiently.
          </p>
        </div>
        <div className='image'>
          <img
            src='https://images.unsplash.com/photo-1654931799020-ce7cf3f4a2c7?q=80&w=1420&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='Todos'
          />
        </div>
      </section>

      <section className='habits'>
        <div className='text'>
          <h2>Habits</h2>
          <p>
            Habits are the building blocks of a successful and fulfilling life.
            They shape our daily routines and ultimately determine our long-term
            outcomes. By cultivating positive habits, we can create a strong
            foundation for personal growth and achievement. Consistency in good
            habits leads to improved productivity, better health, and a more
            balanced lifestyle, making it easier to reach our goals and maintain
            overall well-being.
          </p>
        </div>
        <div className='image'>
          <img
            src='https://images.unsplash.com/photo-1542596081-6d3eaca5240c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='Habits'
          />
        </div>
      </section>

      <section className='journals'>
        <div className='text'>
          <h2>Journals</h2>
          <p>
            Journals are a powerful tool for self-reflection and personal
            growth. They provide a safe space to explore your thoughts,
            feelings, and experiences, helping you gain insight into yourself
            and your life. By regularly journaling, you can track your progress,
            set goals, and identify patterns or areas for improvement. This
            practice can lead to increased self-awareness, emotional
            intelligence, and overall well-being.
          </p>
        </div>
        <div className='image'>
          <img
            src='https://images.unsplash.com/photo-1598802522613-872fd6bfd45e?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='Journals'
          />
        </div>
      </section>
    </main>
  )
}
