import React, { useState, useEffect } from "react";
import './pageSummary.scss'
import _ from "lodash";
import Scrollspy from 'react-scrollspy'

type PageSummaryProps = {
    entries: PageSummaryEntry[],
}

type PageSummaryEntry = {
    location: string,
    label: string,
    htmlElement: HTMLElement
}

export const PageSummary: React.FC<PageSummaryProps> = ({ entries }: PageSummaryProps) => {
    const [hidden, setHidden] = useState<Boolean>(true);

    const handleMouseHover = () => {
        setHidden(!hidden)
    }

    let classnames = "page-summary"
    if (hidden) classnames += " hidden"

    return (
        <div
            className={classnames}
            onMouseEnter={handleMouseHover}
            onMouseLeave={handleMouseHover}
        >
            <div className={"content-wrapper"}>
                <h4>On this page</h4>
                {!hidden && <Scrollspy items={entries.map((e) => e.location)} currentClassName="selected">
                    {entries.map((item) => <li><a href={'#' + item.location}>{item.label}</a></li>)}
                </Scrollspy>}
            </div>
        </div>
    )
}