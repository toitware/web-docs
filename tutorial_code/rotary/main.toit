import gpio
import pulse-counter show Unit Channel

CLK-PIN ::= 32
DT-PIN ::= 33
SW-PIN ::= 25

main:
  // Set up the pins and the counter.
  clk := gpio.Pin CLK-PIN
  dt := gpio.Pin DT-PIN
  sw := gpio.Pin SW-PIN

  // Since we only need one channel, we can just configure the channel while
  // creating the pulse counter. If multiple channels are changing a
  // counter (unit), then we would need to create a list of channels and pass
  // that to the pulse-counter.Unit constructor.
  counter := Unit clk --control-pin=dt
      --on-positive-edge=Channel.EDGE-INCREMENT
      --on-negative-edge=Channel.EDGE-DECREMENT
      --when-control-low=Channel.CONTROL-KEEP
      --when-control-high=Channel.CONTROL-INVERSE

  // Start the counter.
  counter.start

  last-count = counter.value

  while true:
    // Read the current count.
    current-count := counter.value

    // If the count has changed, print the new value.
    if current-count != last-count:
      direction := (count > last-count) ? "clockwise" : "counter-clockwise"
      print "Rotated $direction: $current-count"

    if sw.get == 0:
      counter.clear
      print "Button pressed (counter cleared)"

    // Sleep for a short while to avoid busy-waiting.
    sleep --ms=100
    last-count = current-count
