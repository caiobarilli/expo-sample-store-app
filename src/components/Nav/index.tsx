import React from 'react'

import DrawerHeader from '@/components/DrawerHeader'
import DrawerHeaderBack from '@/components/DrawerHeaderBack'
import DrawerMenu from '@/components/DrawerMenu'

interface HeaderProps {
    type?: 'menu' | 'header' | 'back' | 'back-no-title'
    tabName?: string
    drawerTitle?: string
    props?: any
}

const Nav: React.FC<HeaderProps> = ({ type, tabName, drawerTitle, props }) => {
    try {
        switch (type) {
            case 'menu':
                return <DrawerMenu props={props} />
            case 'header':
                return <DrawerHeader tabName={tabName} />
            case 'back':
                return <DrawerHeaderBack drawerTitle={drawerTitle} />
            case 'back-no-title':
                return <DrawerHeaderBack />
        }
    } catch (error) {
        console.error(error)
    }
}

export default Nav
