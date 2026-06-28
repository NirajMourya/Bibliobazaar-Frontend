import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export const profileTabs = [
  {
    "icon": <PermIdentityOutlinedIcon />,
    "key": "account",
    "label": "Account"
  },
  {
    "icon": <ContactMailOutlinedIcon />,
    "key": "addresses",
    "label": "Addresses"
  },
  {
    "icon": <LibraryBooksOutlinedIcon />,
    "key": "library",
    "label": "Library"
  },
  {
    "icon": <AccessTimeOutlinedIcon />,
    "key": "rentHistory",
    "label": "Rent History"
  },
  {
    "icon": <LogoutOutlinedIcon />,
    "key": "logout",
    "label": "Logout"
  }
]