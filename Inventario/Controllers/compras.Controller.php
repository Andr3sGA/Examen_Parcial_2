<?php  

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../Models/compras.model.php');
$compras = new Clase_compras;
switch ($_GET["op"]) {
    case 'todos':
        $datos = array(); //defino un arreglo
        $datos = $compras->todos(); //llamo al modelo de usuarios e invoco al procedimiento todos y almaceno en una variable
        while ($fila = mysqli_fetch_assoc($datos)) { //recorro el arreglo de datos
            $todos[] = $fila;
        }
        echo json_encode($todos); //devuelvo el arreglo en formato json
        break;
    case "uno":
        $id_compras = $_POST["id_compras"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $compras->uno($id_compras); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        $uno = mysqli_fetch_assoc($datos); //recorro el arreglo de datos
        echo json_encode($uno); //devuelvo el arreglo en formato json
        break;
    case 'insertar':
        $id_clientes = $_POST["id_clientes"];
        $id_producto = $_POST["id_producto"];
        $cantidad = $_POST["cantidad"];
        $total = $_POST["total"];
        $datos = array(); //defino un arreglo
        $datos = $compras->insertar($id_clientes, $id_producto, $cantidad, $total); //llamo al modelo de usuarios e invoco al procedimiento insertar
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
    case 'actualizar':
        $id_compras = $_POST["id_compras"];
        $id_clientes = $_POST["id_clientes"];
        $id_producto = $_POST["id_producto"];
        $cantidad = $_POST["cantidad"];
        $total = $_POST["total"];
        $datos = array(); //defino un arreglo
        $datos = $compras->actualizar($id_compras, $id_clientes, $id_producto, $cantidad, $total); //llamo al modelo de usuarios e invoco al procedimiento actual
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;

    case 'eliminar':
        $id_compras = $_POST["id_compras"]; //defino una variable para almacenar el id del usuario, la variable se obtiene mediante POST
        $datos = array(); //defino un arreglo
        $datos = $compras->eliminar($id_compras); //llamo al modelo de usuarios e invoco al procedimiento uno y almaceno en una variable
        echo json_encode($datos); //devuelvo el arreglo en formato json
        break;
}
