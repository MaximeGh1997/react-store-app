import React from 'react'

const Pagination = (props) => {

    const pagesCount = Math.ceil(props.length / props.itemsPerPage)
    const pages = []

    for (let i=1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <ul className="pagination pagination-sm">
                <li className={"page-item" + (props.currentPage === 1 ? "disabled" : null)}>
                    <button className="page-link" onClick={() => props.onPageChanged(props.currentPage - 1)}>Previous</button>
                </li>

                {pages.map(page => (
                    <li key={page} className={"page-item" + props.currentPage === page ? "active" : null}>
                        <button className="page-link" onClick={() => props.onPageChanged(page)}>{page}</button>
                    </li>
                ))}

                <li className={"page-item" + (props.currentPage === pagesCount ? "disabled" : null)}>
                    <button className="page-link" onClick={() => props.onPageChanged(props.currentPage + 1)}>Next</button>
                </li>
            </ul>
        </div>
    )
}

Pagination.getData = (items, currentPage, itemsPerPage) => {
    // permet de découper un tableau: arr.slice(début, fin)
    const start = currentPage * itemsPerPage - itemsPerPage
    //              3         *     10       -  10          =  20
    return items.slice(start, start + itemsPerPage)
}

export default Pagination