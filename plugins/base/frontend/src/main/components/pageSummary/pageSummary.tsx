import React, { useState, useEffect } from "react";
import './pageSummary.scss'
import Arrow from 'react-svg-loader!../assets/arrow.svg';
import _ from "lodash";
import { SummaryElement } from "./pageSummaryEntry";

type PageSummaryProps = {
    entries: PageSummaryEntry[],
}

type PageSummaryEntry = {
    location: string,
    label: string,
    htmlElement: HTMLElement
}

export const PageSummary: React.FC<PageSummaryProps> = ({ entries }: PageSummaryProps) => {
    const [hidden, setHidden] = useState<Boolean>(false);
    const [highlighted, setHighlighted] = useState<PageSummaryEntry | null>(null);

    const onScroll = () => {
        const currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
        const closest = _.minBy(entries, (element: PageSummaryEntry) => Math.abs(currentPosition - element.htmlElement.offsetTop))
        setHighlighted(closest)
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    })

    let classnames = "page-summary"
    if (hidden) classnames += " hidden"

    return (
        <div className={classnames}>
            <span className={"clickable-icon"} onClick={() => setHidden(!hidden)}><Arrow /></span>
            {!hidden &&
                <div className={"content-wrapper"}>
                    <h4>On this page:</h4>
                    <ul>
                        {entries.map((item) => <SummaryElement location={item.location} label={item.label} highlighted={highlighted === item} />)}
                    </ul>
                </div>}
        </div>
    )
}