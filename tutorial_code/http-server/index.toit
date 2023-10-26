INDEX-HTML ::= """
<!DOCTYPE html>
<html>
<head>
    <title>Chat Server</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #F5F5F5;
            color: #333;
            padding: 10px;
        }
        #messages {
            height: 70vh;
            border: 1px solid #ddd;
            padding: 10px;
            border-radius: 5px;
            overflow-y: auto;
            margin-bottom: 10px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        #input {
            width: 100%;
            height: 30px;
            padding: 5px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <h1>Chat Server</h1>
    <div id="messages"></div>
    <input id="input" type="text" placeholder="Type your message and hit Enter...">
<script>
    var ws = new WebSocket('ws://' + window.location.host + '/ws');
    var messages = document.getElementById('messages');
    var input = document.getElementById('input');

    ws.onmessage = function(event) {
        var message = document.createElement('p');
        message.textContent = event.data;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    };

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            ws.send(input.value);
            input.value = '';
        }
    });
</script>
</body>
</html>
"""
