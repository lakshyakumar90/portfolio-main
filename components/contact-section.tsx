import { ArrowUpRight, Calendar, Mail } from "lucide-react";

export function ContactSection({ className = "" }: { className?: string }) {
  return <section id="book-a-meet" className={`home-section lets-talk ${className}`} aria-labelledby="talk-title" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
    <h2 id="talk-title">Have something in mind?<br /><em>Let’s talk.</em></h2>
    <p>Have a project, a role, or an idea you’d like to explore? I’d love to hear about it.</p>
    <div className="talk-options">
      <a className="home-button home-button-primary" href="mailto:lakshyakumar5023@gmail.com"><Mail size={17} aria-hidden="true" />Send an email<ArrowUpRight size={16} aria-hidden="true" /></a>
      <a className="home-button" href="https://cal.com/lakshya-kumar/30min" target="_blank" rel="noopener noreferrer"><Calendar size={17} aria-hidden="true" />Book a 30-min call<ArrowUpRight size={16} aria-hidden="true" /></a>
      <a className="home-text-link" href="https://www.linkedin.com/in/kumar-lakshya" target="_blank" rel="noopener noreferrer">Connect on LinkedIn<ArrowUpRight size={16} aria-hidden="true" /></a>
    </div>
    <a className="contact-address" href="mailto:lakshyakumar5023@gmail.com">lakshyakumar5023@gmail.com</a>
  </section>;
}
