import net.cellular
import cellular.modules.sequans.monarch

RX ::= 14
TX ::= 48
RTS ::= 21
CTS ::= 47
RESET ::= 45
POWER ::= 46
BAUD ::= 115200

class WalterCellularProvider extends monarch.MonarchService:
  connect client/int config/Map? -> List:
    if not config or config.is-empty:
      config = {
        cellular.CONFIG-UART-RX: RX,
        cellular.CONFIG-UART-TX: TX,
        cellular.CONFIG-UART-CTS: CTS,
        cellular.CONFIG-UART-RTS: RTS,
        cellular.CONFIG-RESET: [RESET, cellular.CONFIG-ACTIVE-LOW],
        cellular.CONFIG-POWER: POWER,
        cellular.CONFIG-UART-BAUD-RATE: BAUD,
      }
    return super client config

main:
  provider := WalterCellularProvider
  provider.install
