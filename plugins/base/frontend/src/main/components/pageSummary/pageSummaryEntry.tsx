import React from "react";
import './pageSummary.scss'

type PageSummaryEntryProps = {
    location: string,
    label: string,
    highlighted: boolean,
}

export const SummaryElement: React.FC<PageSummaryEntryProps> = (props: PageSummaryEntryProps) => {
    const { location, label, highlighted } = props
    let className = highlighted ? 'selected' : ''
    return (
        <li className={className}><a href={`#${location}`}>{label}</a></li>
    )
}