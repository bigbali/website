import {
    useCallback,
    useEffect,
    useState
} from 'react';
import Icon, {
    Direction
} from 'Component/Icon';
import './Switch.style';

interface SwitchProps {
    onSwitch: (value: any) => void,
    valueLeft?: any,
    valueRight?: any,
    iconLeft?: JSX.Element,
    iconRight?: JSX.Element,
    textLeft?: string,
    textRight?: string,
    label?: string,
    externalValue?: any
};

const Switch = ({
    onSwitch,
    valueLeft,
    valueRight,
    iconLeft,
    iconRight,
    textLeft,
    textRight,
    label,
    externalValue = valueLeft
}: SwitchProps) => {
    const [value, setValue] = useState<any>(externalValue);

    const onClick = useCallback(() => {
        const newValue = value === valueLeft ? valueRight : valueLeft;
        onSwitch(newValue);
        setValue(newValue);
    }, [value]);

    useEffect(() => {
        setValue(externalValue);
    }, [externalValue]);

    return (
        <button
            block='Switch'
            onClick={onClick}
            mods={{ isSwitched: value === valueRight }}>
            <div elem='Value'>
                <div elem='Value-Left'>
                    {iconLeft && ( // bem transform doesnt work here
                        <span block='Switch-Value-Left-Icon'>
                            {iconLeft}
                        </span>
                    )}
                    {textLeft && (
                        <span block='Switch-Value-Left-Text'>
                            {textLeft}
                        </span>
                    )}
                </div>
                <div elem='Value-Right'>
                    {iconRight && (
                        <span block='Switch-Value-Right-Icon'>
                            {iconRight}
                        </span>
                    )}
                    {textRight && (
                        <span block='Switch-Value-Right-Text'>
                            {textRight}
                        </span>
                    )}
                </div>
                <Icon.Chevron
                    direction={
                        value === valueRight
                            ? Direction.LEFT
                            : Direction.RIGHT
                    }
                />
            </div>
            <p elem='Label'>
                {label}
            </p>
        </button>
    );
};

export default Switch;