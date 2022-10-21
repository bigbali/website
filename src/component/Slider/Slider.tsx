import {
    ChangeEvent,
    useEffect,
    useState
} from 'react';
import './Slider.style';

export interface SliderProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    min: number,
    max: number,
    step: number,
    label?: string,
    name?: string,
    externalValue?: number,
}

const Slider = ({ min, max, step, label, name, externalValue, onChange }: SliderProps) => {
    const [value, setValue] = useState(externalValue);

    const internalOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(Number.parseFloat(e.currentTarget.value));
        onChange(e);
    };

    useEffect(() => { // this is necessary in case the value is changed from somewhere else
        if (value !== externalValue) { // which means the value here remains unchanged
            setValue(externalValue);
        }
    }, [externalValue]);

    return (
        <div block='Slider'>
            <input
                elem='Input'
                type='range'
                min={min}
                max={max}
                step={step}
                name={name}
                id={name}
                value={value}
                onChange={internalOnChange}
            />
            <label
                elem='Label'
                htmlFor={name}>
                {label}
            </label>
        </div>
    );
};

export default Slider;