import * as React from 'react';
import './mainStyles.scss';

interface Props {
    position?: 'left' | 'right' | 'top';
    mainCustomClass?: string;
    defaultState?: 'open' | 'close';
    menuIconEl?: React.ReactNode;
    children?: React.ReactNode;
}

const NavBar: React.FC<Props> = (props: Props) => {

    let navRef: React.RefObject<HTMLDivElement> = React.createRef();
    let toggleRef: React.RefObject<HTMLDivElement> = React.createRef();
    const [navClass, setNavClass] = React.useState('');
    const [barContainerClass, setBarContainerClass] = React.useState('');

    React.useEffect(() => {
        console.log('w', props)
        decideNavPos();
        decideNavState();
        return () => { }
    }, []);

    const decideNavPos = () => {
        let navClass = props.position === 'left' ? 'ci-side-bar-left' :
            props.position === 'right' ? 'ci-side-bar-right' :
                props.position === 'top' ? 'ci-side-bar-top' : 'ci-side-bar-left';
        navClass = props.mainCustomClass ? `${props.mainCustomClass} ${navClass}` : navClass;
        toggle();
        setNavClass(navClass);
    }

    const decideNavState = () => {
        let barContainerClass = props.defaultState === 'open' ?
            'nav-bar-container active' : 'nav-bar-container';
        setBarContainerClass(barContainerClass);
        if (!navRef.current || !toggleRef.current) return;

        props.defaultState === 'open' ? toggleRef.current.classList.remove('toggle-active') : toggleRef.current.classList.remove('toggle-active');
    }

    const toggle = () => {
        if (!navRef.current || !toggleRef.current) return;
        if (navRef.current.classList.contains('active')) {
            navRef.current.classList.remove('active');
            toggleRef.current.classList.remove('toggle-active');
        }
        else {
            navRef.current.classList.add('active');
            toggleRef.current.classList.add('toggle-active');
        }
    }

    return (
        <div className={navClass}>
            <div ref={toggleRef} className="toggle" onClick={toggle}>
                {props.menuIconEl ?
                    props.menuIconEl :
                    <div className="nav-icon">
                        <div></div>
                    </div>
                }
            </div>
            <div ref={navRef} className={barContainerClass}>
                <div className="content">{props.children}</div>
            </div>
        </div>
    )


}

export default NavBar;

