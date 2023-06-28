import gpio
import gpio.touch as gpio

ITERATIONS := 100

calibrate touch/gpio.Touch:
  sum := 0
  ITERATIONS.repeat:
    sum += touch.read --raw

  // Use 4/5th of the average as cutoff.
  threshold := (sum * 4) / (5 * ITERATIONS)
  print "Threshold: $threshold"
  touch.threshold = threshold

main:
  pin := gpio.Pin 32
  touch := gpio.Touch pin

  calibrate touch

  while true:
    is_touched := touch.get
    print (is_touched ? "touched" : "not touched")
    sleep --ms=500
