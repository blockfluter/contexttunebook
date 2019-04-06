import React from "react";
import { Link } from "react-router-dom";
import styles from "./menu.module.scss";
import classnames from "classnames";

function generateMenu(props) {
    return (
        <ul>
            {props.menu.map((item, index) => {
                const hasSubmenu = item.constructor === Array;
                return (
                    <li key={index}><a onMouseDown= {()=>props.clickMenuItem(hasSubmenu ? item[0].menu : item.menu)}
                        className={classnames({
                            [styles.dropmenu]: hasSubmenu
                        })}></a>
                        {hasSubmenu ? item[0].menu : item.menu}
                        {hasSubmenu && generateSubMenu(item, props)}
                    </li>
                );
            })}
          </ul>
    );
}
function generateSubMenu(menu, props) {
    return (
        menu.constructor === Array && (
            <ul>
                {menu.slice(1, -1).map((item, index) => {
                    const link = item.to ? <Link onClick={removeMenu} to={item.to}>{item.menu}</Link> : <a href="#">{item.menu}</a>;
                    return <li key={index}>{link}</li>;
                })}
            </ul>
        )
    );
}
function removeMenu(event) {
    const node = event.target.parentElement.parentElement;
    node.style.display = "none";
    setTimeout(() => {
        node.style.display = "";
    }, 300);
}

export const Menu = (props) =>{
    return (
        <div className={styles.navWrapper}>
            <span>
                <nav>{generateMenu(props)}</nav>
            </span>
        </div>
    );
}

