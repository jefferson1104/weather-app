import '../index.css';
import * as TooltipRadix from '@radix-ui/react-tooltip';

interface ITooltipProps {
    icon: React.ReactNode;
    description: string;
    isOpen?: boolean;
}

export const Tooltip = ({ icon, description }: ITooltipProps) => {
    // Renders
    return (
        <TooltipRadix.Provider delayDuration={200} skipDelayDuration={500}>
            <TooltipRadix.Root>
                <TooltipRadix.Trigger asChild>
                    <button className="IconButton">
                        {icon}
                    </button>
                </TooltipRadix.Trigger>
                <TooltipRadix.Portal>
                    <TooltipRadix.Content className="TooltipContent" sideOffset={5}>
                        {description}
                        <TooltipRadix.Arrow className="TooltipArrow" />
                    </TooltipRadix.Content>
                </TooltipRadix.Portal>
            </TooltipRadix.Root>
        </TooltipRadix.Provider>
    )
}
