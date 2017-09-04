import React from 'react'
import {ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import SvgIcon from 'material-ui/SvgIcon'

const Item = ({familyName, givenName, positions, id, onClick}) => {
  const departments = positions.reduce((pos, {department}) => {
    if (!pos.includes(department.name)) {
      return [...pos, department.name]
    }
    return pos
  }, [])
  const action = () => onClick(id)
  return (
    <ListItem
      onClick={action}
      primaryText={`${givenName} ${familyName}`}
      secondaryText={`${departments.join(', ')}`}
      rightIcon={<ArrowIcon />}
      leftAvatar={
        <Avatar icon={<AvatarIcon />} />
      }
    />
  )
}

export default Item

const ArrowIcon = (props) => (
  <SvgIcon {...props}>
    <path d='M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z' />
  </SvgIcon>
)

const AvatarIcon = (props) => (
  <SvgIcon {...props}>
    <path d='M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z' />
  </SvgIcon>
)
