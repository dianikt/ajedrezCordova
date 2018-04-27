
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
        boton.click(login);

        var logout = $('#logout');
        logout.click(logoutUsuario);

        var registro = $('#registro');
        registro.click(registroUsuario);

        var registrar = $('#registrarse');
        registrar.click(registrarse);

        var jugar = $("#jugar");
        jugar.click(iniciaPartida);

         var final = $("#finalizar");
        final.click(finalizarPartida);
        
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

        //recargaTablero();

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
                            var fila = $("<td id="+i+j+" style='background-color:black;'></td>");
                           
                         }else{                            
                            var fila = $("<td id="+i+j+" style='background-color:white;'></td>");                           
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


var actEstado = 1;

function movimiento(event){
    //$( "div" ).click(function() {
    //var color = $( this ).css( "background-color" );
    var pos1 =  localStorage.getItem('pos1');
    var pos2 =  localStorage.getItem('pos2');

    if(pos1 == pos2)
    { 
        alert("!! HAS GANADO !!");
        finalizarPartida();
    }else{
        $.ajax({
            type: "POST",
            url:"https://vast-brook-31764.herokuapp.com/api/movimiento",
            dataType: 'json',
            data:{
                posNueva: (event.target.id),
                idFicha1: localStorage.getItem('idFicha1'),
                idFicha2: localStorage.getItem('idFicha2'),
                estado: localStorage.getItem('estado'),
                idPartida:localStorage.getItem('idPartida')
            },
            success: function(data) {
              
                //comprobar movimiento.....
                             
                actEstado = JSON.parse(localStorage.getItem('estado'));
                var turno = data['estado'];

                var idJugador1 = localStorage.getItem('idJugador1');
                var idJugador2 = localStorage.getItem('idJugador2');

                var posAnt = localStorage.getItem('pos1'); 
                $('#'+posAnt).css("background-image", "");
                var pos1 = event.target.id;               
                $('#'+pos1).css("background-image", "url('img/blanca.png')");
                $('#'+pos1).css("background-size", "cover");
                localStorage.setItem('pos1', pos1);
          
                if(localStorage.getItem('partidas') == 1){
                    var posAnt = localStorage.getItem('pos2'); 
                    $('#'+posAnt).css("background-image", "");              

                    var pos2 = localStorage.getItem('pos2');               
                    $('#'+pos2).css("background-image", "url('img/negra.png')");
                    $('#'+pos2).css("background-size", "cover");
                    localStorage.setItem('pos2', pos2);
                }   

                actEstado = actEstado+1;
                localStorage.setItem('estado', actEstado);
                //alert(actEstado);

            },        
        });  
    }
}

function login(event){
    var email = $('#email').val();
    var password = $('#pass').val();

     $.ajax({
        type: "POST",
        url:"https://vast-brook-31764.herokuapp.com/api/login",
        dataType: 'json',
        data:{
            email: email,
            password: password
        },
        success: function(data) {
            if(data['mensaje'] == 1){
                localStorage.setItem("email", data['email']);
                localStorage.setItem("token", data['token']);
                localStorage.setItem("idJugador1", data['idJugador1']);          
               
                window.location = "tablaJugadores.html";
            }
            else {
               alert(data['mensaje']);
            }
        }        
    });

}

function logoutUsuario() {
    var id = localStorage.getItem('email');   

    $.ajax({
        type: "POST",
        url:"https://vast-brook-31764.herokuapp.com/api/logout",
        dataType: 'json',
        data:{
           email: localStorage.getItem('email'),
        },
        success: function(data) {
            alert(data['mensaje']); 
            localStorage.setItem("email", '');
            localStorage.setItem("token", '');
            localStorage.setItem("idJugador1", '');
            localStorage.setItem("idJugador2", '');
            localStorage.setItem("idFicha1", '' );
            localStorage.setItem("idFicha2", '' );
            localStorage.setItem("pos1",'' );
            localStorage.setItem("pos2", '' );
            localStorage.setItem("idPartida", '' );     
            localStorage.setItem("estado", '');
            localStorage.setItem("partidas", '');
            window.location = "index.html";       
        }        
    });
}

function registroUsuario(){
    window.location = "registro.html";
} 

function registrarse(){

    var nombre = $('#name').val();
    var email = $('#email').val();
    var password = $('#pass').val();

     $.ajax({
        type: "POST",
        url:"https://vast-brook-31764.herokuapp.com/api/registro",
        dataType: 'json',
        data:{
            nombre:nombre,
            email: email,
            password: password
        },
        success: function(data) {
            alert(data['mensaje']);
            window.location = "index.html"; 
        }        
    });

}

function iniciaPartida(){

    /*if($('input[name=part]').is(":checked")){  
        var  part =  $('input[name=part]:checked').val();
        initPartidaAntigua(part);
    }*/
     
    var idJugador2  = ($('input:radio[name=jug]:checked').val());   
    localStorage.setItem('id', idJugador2);    
    $.ajax({
        type: "POST",
        url:"https://vast-brook-31764.herokuapp.com/api/initPartida",
        dataType: 'json',
        data:{
            idJugador1:localStorage.getItem('idJugador1'),
            token:localStorage.getItem('token'),
            idJugador2:idJugador2,           
        },
        success: function(data) {
            localStorage.setItem("idFicha1", data['ficha1'][0]['idFicha'] );
            localStorage.setItem("idFicha2", data['ficha2'][0]['idFicha'] );
            localStorage.setItem("pos1", data['ficha1'][0]['pos'] );
            localStorage.setItem("pos2", data['ficha2'][0]['pos'] );
            localStorage.setItem("idPartida", data['ficha1'][0]['idPartida'] );     
            localStorage.setItem("estado", data['estado']);

            window.location = "tablero.html"; 
        },
        error: function (data) {
            alert(data['mensaje']);
           
        }        
    });    
}

function initPartidaAntigua(){
    var idJugador2 = $('input[name=part]:checked').val();
    localStorage.setItem('id', idJugador2);    
    $.ajax({
        type: "POST",
        url:"https://vast-brook-31764.herokuapp.com/api/initPartida",
        dataType: 'json',
        data:{
            idJugador1:localStorage.getItem('idJugador1'),
            token:localStorage.getItem('token'),
            idJugador2:idJugador2,           
        },
        success: function(data) {
            localStorage.setItem("idFicha1", data['ficha1'][0]['idFicha'] );
            localStorage.setItem("idFicha2", data['ficha2'][0]['idFicha'] );
            localStorage.setItem("pos1", data['ficha1'][0]['pos'] );
            localStorage.setItem("pos2", data['ficha2'][0]['pos'] );
            localStorage.setItem("idPartida", data['ficha1'][0]['idPartida'] );     
            localStorage.setItem("estado", data['estado']);

            window.location = "tablero.html"; 
        },
        error: function (data) {
            alert(data['mensaje']);
           
        }        
    });    
}

function finalizarPartida(){
   
    $.ajax({
        type: "POST",
        url:"https://vast-brook-31764.herokuapp.com/api/finalizar",
        dataType: 'json',
        data:{
            idJugador1:localStorage.getItem('idJugador1'),
            idJugador2:localStorage.getItem('idJugador2'),
            idPartida:localStorage.getItem('idPartida'),      
        },
        success: function(data) {
            localStorage.setItem("email", '');
            localStorage.setItem("token", '');
            localStorage.setItem("idJugador1", '');
            localStorage.setItem("idJugador2", '');
            localStorage.setItem("idFicha1", '' );
            localStorage.setItem("idFicha2", '' );
            localStorage.setItem("pos1",'' );
            localStorage.setItem("pos2", '' );
            localStorage.setItem("idPartida", '' );     
            localStorage.setItem("estado", '');
            localStorage.setItem("partidas", '');
            window.location = "index.html"; 
        },
        error: function (data) {
        }        
    });    


}

function recargaTablero(){
    
    setInterval(function(){
        $.ajax({
            type: "POST",
            url:"https://vast-brook-31764.herokuapp.com/api/recargaTablero",
            dataType: 'json',
            data:{
                 idFicha1:localStorage.getItem('idFicha1'),
                 idFicha2:localStorage.getItem('idFicha2'),
                 pos1:localStorage.getItem('pos1'),
                 pos2:localStorage.getItem('pos2'),
            },
            success: function (data) {               
              // localStorage.setItem("pos1", data['ficha1']['pos'] );
               //localStorage.setItem("pos2", data['ficha2']['pos'] ); 
          },     
        });
    }, 2000);

}