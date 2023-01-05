import {
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState
} from 'react';
import { Status, Tag } from 'data/projects';
import Help, { Orientation } from 'Component/Help';
import Icon from 'Component/Icon';
import './filter.style';

type FilterProps = {
    defaultLimit: number,
    elementsShownCount: number,
    isDesktop: boolean,
    setStatus: Dispatch<SetStateAction<Status>>,
    setTag: Dispatch<SetStateAction<string | undefined>>,
    setLimit: Dispatch<SetStateAction<number>>,
    setTitle: Dispatch<SetStateAction<string | undefined>>
};

const Filter = ({
    defaultLimit,
    elementsShownCount,
    isDesktop,
    setStatus,
    setTag,
    setLimit,
    setTitle
}: FilterProps) => {
    const [isExpanded, setIsExpanded] = useState(isDesktop);
    const filterRef = useRef<HTMLFieldSetElement>(null);

    useEffect(() => { // using BEM mods={IS_EXPANDED: isExpanded} conflicted with animate-on-scroll
        filterRef.current?.classList.toggle('IS_EXPANDED', isExpanded);
    }, [isDesktop, isExpanded]);

    return (
        <fieldset
            block='Filter'
            className='animate-on-scroll'
            ref={filterRef}
        >
            <div>
                <legend>
                    Filter
                </legend>
                <p>
                    {isDesktop && `Showing ${elementsShownCount} ${elementsShownCount === 1 ? 'element' : 'elements'}.`}
                    {!isDesktop && `${elementsShownCount} ${elementsShownCount === 1 ? 'element' : 'elements'}.`}
                </p>
                <button title='Expand Filters' onClick={() => setIsExpanded(!isExpanded)}>
                    <Icon.Chevron />
                </button>
            </div>
            <div elem='Controls'>
                <div elem='Controls-Status'>
                    <div>
                        <label htmlFor="status">
                            Status
                        </label>
                        <Help
                            orientation={Orientation.BELOW}
                            content={`
                                    Explanation:<ul>
                                        <li>
                                            ${'' /* eslint-disable-next-line max-len */}
                                            <span>Finished:</span> has reached MVP (Minimally Viable Product) status, but I will possibly still work on it;
                                        </li>
                                        <li>
                                            <span>In Progress:</span> I am currently working on it;
                                        </li>
                                        <li>
                                            <span>Paused:</span> I have paused work on the project, but will continue at a later date.
                                        </li>
                                    </ul>
                                `}
                        />
                    </div>
                    <select
                        name='status'
                        id='status'
                        defaultValue={Status.ANY}
                        onChange={(e) => {
                            setStatus(e.currentTarget.value as Status);
                            setLimit(defaultLimit);
                        }}
                    >
                        {Object.values(Status).map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>
                <div elem='Controls-Title'>
                    <label htmlFor="title">
                        Title
                    </label>
                    <input
                        name='title'
                        id='title'
                        onChange={(e) => setTitle(e.currentTarget.value)}
                    >
                    </input>
                </div>
                <div elem='Controls-Tag'>
                    <label htmlFor="tag">
                        Tag
                    </label>
                    <input
                        type='text'
                        list='tags'
                        id='tag'
                        name='tag'
                        onChange={(e) => setTag(e.currentTarget.value as Tag)}
                    />
                    <datalist id='tags'>
                        {Object.values(Tag).map((tag) => (
                            <option key={tag} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </datalist>
                </div>
            </div>
        </fieldset >
    );
};

export default Filter;