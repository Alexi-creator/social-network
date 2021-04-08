import React from 'react';
import styles from './Paginator.module.css'

const Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged, minPage, setPaginator, porcionPaginator}) => {

    let pageCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];

    // определяем min и max значения границы порции (например это 1 и 10 для пагинатора)
    let minNumberOfPorcian = (minPage - 1) * porcionPaginator + 1
    let maxNumberOfPorcian = minPage * porcionPaginator

    // делаем пагинатор, массив из границ min и max (например это 1 и 10 в пагинаторе)
    for (let i = minNumberOfPorcian; i <= maxNumberOfPorcian && i <= pageCount; i++) {
        pages.push(i);
    }

    let active = styles.btnActive
    let statusBtnLeft = (minNumberOfPorcian > porcionPaginator) ? active : null
    let statusBtnRight = (maxNumberOfPorcian > pageCount) ? null : active



    return (

        <div className={styles.pageWrap}>

            <button onClick={() => {setPaginator(minPage - 1)}} className={styles.btn + ' ' + styles.btnLeft + ' ' + statusBtnLeft}>prev</button>

            {pages.map((p, index) => {
                let style = currentPage === p ? styles.selectedPage : null;
                return <span key={index} className={style}
                             onClick={(e) => {
                                 onPageChanged(p) }}> {p} </span>
            })}

            <button onClick={() => {setPaginator(minPage + 1)}} className={styles.btn + ' ' + styles.btnRight + ' ' + statusBtnRight}>next</button>

        </div>

    )
}

export default Paginator;
