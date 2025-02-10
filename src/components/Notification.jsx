import { useNotificationValue } from "../NotificationContext"
import { useContext } from "react"

const Notification = () => {
  const notification = useNotificationValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!notification.visible) return null

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification
