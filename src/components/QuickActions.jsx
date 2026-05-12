import { Bell, Brain, BriefcaseBusiness, Search } from "lucide-react";

const actions = [
  { label: "Memory", icon: Brain, prompt: "Read my memory and tell me what you know." },
  { label: "Brief", icon: Bell, prompt: "Prepare my morning brief." },
  { label: "Search", icon: Search, prompt: "Search the web for one useful thing I should know today." }
];

export default function QuickActions({ onSend, onDeepWork }) {
  return (
    <section className="quick-actions" aria-label="Quick actions">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button key={action.label} className="quick-chip" onClick={() => onSend(action.prompt)}>
            <Icon size={15} />
            {action.label}
          </button>
        );
      })}
      <button className="quick-chip" onClick={onDeepWork}>
        <BriefcaseBusiness size={15} />
        Deep Work
      </button>
    </section>
  );
}

