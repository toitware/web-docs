import gpio
import gpio.touch as gpio

main:
  pin := gpio.Pin 32
  touch := gpio.Touch pin

  touch.threshold = 800

  while true:
    is_touched := touch.get
    print (is_touched ? "touched" : "not touched")
    sleep --ms=500
