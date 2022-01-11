import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilSettings, cilUser, cilToggleOn, cilToggleOff } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatarSeto from './../../assets/images/avatars/Seto.jpg'

const AppHeaderDropdown = () => {
  const dispatch = useDispatch()
  const onlineStatus = useSelector((state) => state.onlineStatus)

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <div>
          <CAvatar
            src={avatarSeto}
            shape="rounded"
            size="md"
            className="me-2"
            status={onlineStatus}
          />
          Pratama Wijaya
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem
          hidden={onlineStatus === 'success' ? true : false}
          href="#"
          onClick={() => dispatch({ type: 'set', onlineStatus: 'success' })}
        >
          <CIcon icon={cilToggleOn} className="me-2" />
          Turn Online
        </CDropdownItem>
        <CDropdownItem
          hidden={onlineStatus === 'danger' ? true : false}
          href="#"
          onClick={() => dispatch({ type: 'set', onlineStatus: 'danger' })}
        >
          <CIcon icon={cilToggleOff} className="me-2" />
          Turn Offline
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
