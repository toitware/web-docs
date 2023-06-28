import gpio
import gpio.touch as gpio

main:
  pin := gpio.Pin 32
  touch := gpio.Touch pin

  while true:
    print (touch.read --raw)
    sleep --ms=500
