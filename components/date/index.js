import { getFormatedDate } from '../../lib/helpers';

export default function Date({date}){
    return (
        <time dateTime={date}>
            { getFormatedDate(date) }
        </time>
    )
}