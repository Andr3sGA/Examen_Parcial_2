 <?php   
require_once('../Config/cls_conexion.model.php');
class Clase_cliente
{
    public function todos()
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "SELECT * FROM `clientes`";
            $result = mysqli_query($con, $cadena);
            return $result;
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function uno($id_clientes)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "SELECT * FROM `clientes` WHERE id_clientes=$id_clientes";
            $result = mysqli_query($con, $cadena);
            return $result;
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function insertar($nombre, $direccion, $telefono)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "INSERT INTO `clientes`( `nombre`, `direccion`, `telefono`) VALUES ('$nombre','$direccion', '$telefono')";

            $result = mysqli_query($con, $cadena);
            return 'ok';
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function actualizar($id_clientes, $nombre, $direccion, $telefono)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "UPDATE `clientes` SET `nombre`='$nombre',`direccion`='$direccion',`telefono`='$telefono' WHERE `id_clientes`=$id_clientes";
            $result = mysqli_query($con, $cadena);
            return "ok";
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function eliminar($id_clientes)
    {
        try {
            $con = new Clase_Conectar_Base_Datos();
            $con = $con->ProcedimientoConectar();
            $cadena = "delete from clientes where id_clientes=$id_clientes";
            $result = mysqli_query($con, $cadena);
            return "ok";
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}
/*

"SELECT * FROM `Proveedor` WHERE ProveedorId=4<br />
<b>Fatal error</b>:  Uncaught TypeError: mysqli_fetch_assoc(): Argument #1 ($result) must be of type mysqli_result, string given in /Applications/MAMP/htdocs/Sexto_PHP_ANGULAR/Inventario/Controllers/Proveedor.Controller.php:27
Stack trace:
#0 /Applications/MAMP/htdocs/Sexto_PHP_ANGULAR/Inventario/Controllers/Proveedor.Controller.php(27): mysqli_fetch_assoc('Table 'inventar...')
#1 {main}
  thrown in <b>/Applications/MAMP/htdocs/Sexto_PHP_ANGULAR/Inventario/Controllers/Proveedor.Controller.php</b> on line <b>27</b><br />
"
*/