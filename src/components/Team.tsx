import Image from 'next/image'
import FadeUp from './FadeUp'

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const TEAM = [
  {
    name: 'Pratik Lamsal',
    role: 'Co-founder, Infrastructure',
    photo: '/assets/team/pratik.jpg',
    bio: null as string | null,
    linkedin: 'https://www.linkedin.com/in/pratiklam/',
  },
  {
    name: 'Akash Hadagali Persetti',
    role: 'Co-founder, Engineering',
    photo: '/assets/team/akash.jpg',
    bio: 'Lead of product engineering at Laxora, focused on building AI systems reliable enough for healthcare.',
    linkedin: 'https://www.linkedin.com/in/akash-hp/',
  },
]

export default function Team() {
  return (
    <section id="team" className="py-20" aria-labelledby="team-heading">
      <div className="max-w-container mx-auto px-6">
        <FadeUp className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Team</span>
          <h2 id="team-heading" className="mt-2 text-3xl font-bold text-heading tracking-tight">
            Built by people who want it to work.
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEAM.map((member, i) => (
            <FadeUp key={member.name} delay={i * 0.08}>
              <div className="rounded-card border border-border p-6 flex gap-5">
                <Image
                  src={member.photo}
                  alt={`${member.name}, ${member.role}`}
                  width={96}
                  height={96}
                  className="rounded-full object-cover shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-heading">{member.name}</h3>
                  <p className="text-sm text-muted mt-0.5 mb-2">{member.role}</p>
                  {member.bio && (
                    <p className="text-sm text-body leading-relaxed mb-3">{member.bio}</p>
                  )}
                  <a
                    href={member.linkedin}
                    className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover transition-colors duration-150"
                    aria-label={`${member.name} on LinkedIn`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInIcon />
                    LinkedIn
                  </a>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
