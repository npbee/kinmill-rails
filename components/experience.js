import { colors, spacing, type } from '../lib/theme';

function Role(props) {
    const { name, dates } = props;

    return <div className='role'>
        <div className='role-name'>{name}</div>
        <div className='role-dates'><em>{dates[0]} to {dates[1]}</em></div>
        <style jsx>{`
            .role {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }
        `}</style>
    </div>;
}

function Highlight(props) {
    const { text } = props;

    return <p>{text}</p>;
}

export default function Experience(props) {
    const {
        color,
        name,
        logo,
        site,
        roles,
        dates,
        highlights
    } = props;

    return <div className='container'>
        <div className="content">
            <header>
                <h2 style={{ color}}><a className='site-link' href={site}>{name}</a></h2>
                <small>{dates[0]} to {dates[1]}</small>
            </header>
            <hr />
            <div className='roles'>
                {roles.map(role => (
                    <p key={role.title} className='role'>
                        <strong>{role.title}</strong>&nbsp;<span>({role.dates[0]} to {role.dates[1]})</span>
                    </p>
                ))}
            </div>
            <p className='highlights'><em>{highlights.join(', ')}</em></p>
        </div>
        <style jsx>{`
            header {
                padding-bottom: ${spacing(1)};
            }
            hr {
                outline: none;
                border: none;
                height: 1px;
                background: #d9d9d9;
                width: 20px;
                margin-left: 0;
            }
            .container {
                display: flex;
                flex-direction: row;
                position: relative;
                border-left: 3px solid #666;
            }
            .container:before {
                content: "";
                position: absolute;
                left: -1px;
                top: 0;
                transform: translate(-50%);
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background-color: #666;
            }
            .container:last-child:after {
                content: "";
                position: absolute;
                left: -1px;
                bottom: 0;
                transform: translate(-50%);
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background-color: #666;
            }
            .content {
                transform: translateY(-6px);
                padding-bottom: ${spacing(4)};
                padding-left: ${spacing(4)};
                position: relative;
            }
            .content h2 {
                margin: 0;
            }
            .highlights,
            .roles {
                margin-bottom: ${spacing(3)};
                margin-top: ${spacing(1)};
            }
            .role {
                margin-bottom: 5px;
                margin-top: 5px;
            }
            .role span {
                color: ${colors.muted};
                font-size: ${type(5)};
            }
            .roles strong {
                // display: block;
            }
            .logo {
                max-width: 100px;
            }
            .site-link {
                font-weight: normal;
                color: inherit;
                display: block;
                text-decoration: none;
            }
        `}</style>
    </div>;
}
