import { Button } from '~/components';
import { lookupPanelButtons } from '~/constants/navlinks';

interface NavPanelProps {
  activePanel: number;
  setActivePanel: (index: number) => void;
}

function NavPanel({ activePanel, setActivePanel }: NavPanelProps) {
  return (
    <div className="sticky top-0 py-4 mb-2 bg-[#f5f5f5] z-50">
      <ul className="hidden w-full grid-cols-4 bg-white rounded-sm md:grid">
        {lookupPanelButtons.map((button, index) => (
          <li className="flex-grow" key={index}>
            <Button
              className={`w-full px-6 py-4 text-[14px] font-semibold rounded-sm ${
                activePanel === index ? 'bg-primary text-white' : 'text-icon hover:text-primary'
              }`}
              onClick={() => setActivePanel(index)}
            >
              <span>{button.title}</span>
            </Button>
          </li>
        ))}
      </ul>
      <ul className="grid grid-cols-4 px-2 md:hidden gap-x-3 ">
        {lookupPanelButtons.map((button, index) => (
          <li key={index}>
            <span className="flex flex-col items-center justify-center text-center transition-all duration-500">
              <span
                className={`mb-1 w-full rounded-lg cursor-pointer ${
                  activePanel === index
                    ? 'text-white bg-primary20 shadow-success_hover'
                    : 'shadow-card bg-white text-icon'
                }`}
                onClick={() => setActivePanel(index)}
              >
                <div className="flex items-center justify-center px-1 py-3">{button.icon}</div>
              </span>
              <span
                className={`text-xs ${
                  activePanel === index ? 'text-primary20 font-semibold' : 'text-icon font-medium'
                }`}
              >
                {button.title}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavPanel;
