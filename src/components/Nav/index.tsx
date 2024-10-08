import React from 'react'

import BottomTabsHeader from '@/components/BottomTabsHeader'
import ScreenHeader from '@/components/ScreenHeader'
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
                return <BottomTabsHeader tabName={tabName} />
            case 'back':
                return <ScreenHeader drawerTitle={drawerTitle} />
            case 'back-no-title':
                return <ScreenHeader />
        }
    } catch (error) {
        console.error(error)
    }
}

export default Nav
