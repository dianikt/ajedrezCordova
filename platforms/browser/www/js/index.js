
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        //this.receivedEvent('deviceready');
        var boton = $('#boton');
        boton.click(valor);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);*/
    },

    pintaTablero: function() {
        var letras = ["A","B","C","D","E","F","G","H"];
        var tabla = $('#table_ajedrez');

        for(var i=0;i<=8;i++){
            for(var j=0;j<=8;j++){                
                if(i == 0){
                    tabla.append("<th>"+j+"</th>");
                }else if(j == 0){
                    tabla.append("<tr></tr>");
                    tabla.append("<th>"+letras[i-1]+"</th>");
                }else{
                    if(j > 8){
                        tabla.append("<tr></tr>");
                    }else{
                        if((i%2 == 0 && j%2 == 0)||(i%2 != 0 && j%2 != 0)){
                            var fila = $("<td id="+i+j+" style='background-color:black'></td>");
                           
                         }else{                            
                            var fila = $("<td id="+i+j+" style='background-color:white'></td>");                           
                        }
                    fila.click(movimiento);
                    tabla.append(fila);
                    }
                }
            }
        }
    },


};

app.initialize();
app.pintaTablero();


function movimiento(event){
    alert(event.target.id);
}

function valor(event){
    var email = $('#email').val();
    var password = $('#pass').val();

}
    


