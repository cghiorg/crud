import React, { useState } from 'react';
import MaterialTable from 'material-table';
import datos from "./estructura.json"
import { Container } from '@material-ui/core';
import { Modal, TextField, Button, MenuItem } from '@material-ui/core';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { orange } from '@material-ui/core/colors';

// Crea un tema de color Material UI
const theme = createTheme({
  palette: {
    primary: {
      // CAmbio de color a Naranja
      main: orange[500],
    },
  },
});

// Definicion de estilos basicos
const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 700,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));


function App() {
  const styles = useStyles();
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalDetalle, setModalDetalle] = useState(false);
  const [cargoSeleccionado, setCargoSeleccionado] = useState({
    id: "",
    name: "",
    letra: "",
    mission: "",
    decreto: "",
    marco_legal: "",
    diagnostico: "",
    procesos_participativos: "",
    function: "",
    parent: ""
  })

  // Verifica los estados de los inputs
  const handleChange = e => {
    const { name, value } = e.target;
    setCargoSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  // Selecciona el cargo para:
  const seleccionarCargo = (cargo, accion) => {
    setCargoSeleccionado(cargo);
    (accion === "Insertar") ? abrirCerrarModalInsertar()
      :
      (accion === "Editar") ? abrirCerrarModalEditar()
        :
        (accion === "Detalle") ? abrirCerrarModalDetalle()
          :
          abrirCerrarModalEliminar()
  }

  // Abrir o Cerrar ventana modal (insertar)
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  // Abrir o Cerrar ventana modal (editar)
  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  // Abrir o Cerrar ventana modal (Borrar)
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  // Abrir o Cerrar ventana modal (Detalle)
  const abrirCerrarModalDetalle = () => {
    setModalDetalle(!modalDetalle);
  }

  // Body para insertar registro
  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar nuevo cargo</h3>
      <TextField className={styles.inputMaterial} label="Nombre" name="name" />
      <br />
      <TextField className={styles.inputMaterial} label="Letra" name="letra" />
      <br />
      <TextField className={styles.inputMaterial} label="Mission" name="mission" />
      <br />
      <TextField className={styles.inputMaterial} label="Decreto" name="decreto" />
      <br />
      <TextField className={styles.inputMaterial} label="Marco legal" name="marco_legal" />
      <br />
      <TextField className={styles.inputMaterial} label="Diagnostico" name="diagnostico" />
      <br />
      <TextField className={styles.inputMaterial} label="Procesos participativos" name="procesos_participativos" />
      <br />
      <TextField className={styles.inputMaterial} label="Function" name="function" />
      <br />
      <TextField
        className={styles.inputMaterial}
        select
        label="Dependiente"
        value={datos.id}
      >
        {datos.map((option) => (
          <MenuItem key={option.id} value={option.id} name='parent'>
            {option.name}
          </MenuItem>
        ))}
      </TextField>

      <br />
      <div align="right">
        <Button color="primary" onClick={console.log()}>Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )
  // Body para Editar registro
  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar de Cargo</h3>
      <TextField className={styles.inputMaterial} label="Nombre" name="name" value={cargoSeleccionado && cargoSeleccionado.name} />
      <br />
      <TextField className={styles.inputMaterial} label="Letra" name="letra" value={cargoSeleccionado && cargoSeleccionado.letra} />
      <br />
      <TextField className={styles.inputMaterial} label="Mission" name="mission" value={cargoSeleccionado && cargoSeleccionado.mission} />
      <br />
      <TextField className={styles.inputMaterial} label="Decreto" name="decreto" value={cargoSeleccionado && cargoSeleccionado.decreto} />
      <br />
      <TextField className={styles.inputMaterial} label="Marco legal" name="marco_legal" value={cargoSeleccionado && cargoSeleccionado.marco_legal} />
      <br />
      <TextField className={styles.inputMaterial} label="Diagnostico" name="diagnostico" value={cargoSeleccionado && cargoSeleccionado.diagnostico} />
      <br />
      <TextField className={styles.inputMaterial} label="Procesos participativos" name="procesos_participativos" value={cargoSeleccionado && cargoSeleccionado.procesos_participativos} />
      <br />
      <TextField className={styles.inputMaterial} label="Function" name="function" value={cargoSeleccionado && cargoSeleccionado.function} />

      <TextField
        className={styles.inputMaterial}
        select
        label="Dependiente"
        value={cargoSeleccionado.parent}
      >
        {datos.map((option) => (
          <MenuItem key={option.id} value={option.id} name='parent'>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      <br />
      <br />
      <div align="right">
        <Button color="primary" >Guardar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  // Body para Mostar detalle registro
  const bodyDetalle = (
    <div className={styles.modal}>
      <h3>Detalle de Cargo</h3>
      <TextField className={styles.inputMaterial} label="Nombre" name="name" value={cargoSeleccionado && cargoSeleccionado.name} disabled />
      <br />
      <TextField className={styles.inputMaterial} label="Letra" name="letra" value={cargoSeleccionado && cargoSeleccionado.letra} disabled />
      <br />
      <TextField className={styles.inputMaterial} label="Mission" name="mission" value={cargoSeleccionado && cargoSeleccionado.mission} disabled />
      <br />
      <TextField className={styles.inputMaterial} label="Decreto" name="decreto" value={cargoSeleccionado && cargoSeleccionado.decreto} disabled />
      <br />
      <TextField className={styles.inputMaterial} label="Marco legal" name="marco_legal" value={cargoSeleccionado && cargoSeleccionado.marco_legal} disabled />
      <br />
      <TextField className={styles.inputMaterial} label="Diagnostico" name="diagnostico" value={cargoSeleccionado && cargoSeleccionado.diagnostico} disabled />
      <br />
      <TextField className={styles.inputMaterial} label="Procesos participativos" name="procesos_participativos" value={cargoSeleccionado && cargoSeleccionado.procesos_participativos} disabled />
      <br />
      <TextField className={styles.inputMaterial} label="Function" name="function" value={cargoSeleccionado && cargoSeleccionado.function} disabled />
      <br />

      {datos.filter(c => c.id === cargoSeleccionado.parent).map(filtro => (
        <TextField className={styles.inputMaterial} label="Dependencia" name="parent" value={filtro.name} disabled />
      ))}

      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => abrirCerrarModalDetalle()}>Cerrar</Button>
      </div>
    </div>
  )


  // Body para Eliminar registro
  const bodyEliminar = (
    <div className={styles.modal}>
      <p>Esta seguro que deseas eliminar al CARGO <b>{cargoSeleccionado && cargoSeleccionado.name}</b>? </p>
      <div align="right">
        <Button color="secondary" >Sí</Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )

  return (
    <Container fixed>
      <ThemeProvider theme={theme}>
        <div className={styles.root}>
          <AppBar position="static" color="primary">
            <Toolbar variant="dense" color="secondary">
              <IconButton edge="start" className={styles.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit">
                Gobierno de Tierra del Fuego
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      </ThemeProvider>
      <div>
        <MaterialTable
          title="Estructura"
          data={datos}
          actions={[
            {
              icon: 'assignment',
              tooltip: 'Ver detalle',
              onClick: (event, rowData) => {
                // Funcion para ver el detalleS
                seleccionarCargo(rowData, "Detalle")
              }
            },
            {
              icon: 'edit',
              tooltip: 'Editar cargo',
              onClick: (event, rowData) => {
                // Funcion para editar
                seleccionarCargo(rowData, "Editar")
              }
            },
            {
              icon: 'delete',
              tooltip: 'Borrar cargo',
              onClick: (event, rowData) => {
                // Funcion de borrado
                seleccionarCargo(rowData, "Eliminar")
              }
            },

            {
              icon: 'add',
              tooltip: 'Crear nuevo cargo',
              isFreeAction: true,
              onClick: (event, rowData) => {
                // Funcion para crear uno nuevo
                seleccionarCargo(rowData, "Insertar")

              }
            }
          ]}

          columns={[
            { title: 'Nombre', field: 'name' },
            { title: 'Letra', field: 'letra' },
            { title: 'Mission', field: 'mission' },
            { title: 'Function', field: 'function' },
            { title: 'Decreto', field: 'decreto' },
          ]}
          localization={{
            body: {
              emptyDataSourceMessage: "No hay registros que mostrar",
              addTooltip: 'Agregar',
              deleteTooltip: 'Borrar',
              editTooltip: 'Editar',
              filterRow: {
                filterTooltip: 'Filtro'
              },
              editRow: {
                deleteText: '¿Quieres eliminar esta línea?',
                cancelTooltip: 'Cancelar',
                saveTooltip: 'Grabar'
              }
            },
            grouping: {
              placeholder: "Extraer encabezado...",
              groupedBy: 'Agrupar por:'
            },
            header: {
              actions: 'Acciones'
            },

            pagination: {
              labelDisplayedRows: '{from}-{to} de {count}',
              labelRowsSelect: 'filas',
              labelRowsPerPage: 'filas por página:',
              firstAriaLabel: 'Primera página',
              firstTooltip: 'Primera página',
              previousAriaLabel: 'Página anterior',
              previousTooltip: 'Página anterior',
              nextAriaLabel: 'Página siguiente',
              nextTooltip: 'Página siguiente',
              lastAriaLabel: 'Última página',
              lastTooltip: 'Última página'
            },
            toolbar: {
              addRemoveColumns: 'Agregar o quitar columnas',
              nRowsSelected: '{0} fila(s) seleccionada(s)',
              showColumnsTitle: 'Mostrar columnas',
              showColumnsAriaLabel: 'Mostrar columnas',
              exportTitle: 'Exportar',
              exportAriaLabel: 'Exportar',
              exportName: 'Exportar a CSV',
              searchTooltip: 'Buscar',
              searchPlaceholder: 'Buscar'
            }
          }}
          parentChildData={(row, rows) => rows.find(a => a.id === row.parent)}
          options={{
            actionsColumnIndex: -1,
          }}
        />
      </div>
      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>

      <Modal
        open={modalDetalle}
        onClose={abrirCerrarModalDetalle}>
        {bodyDetalle}
      </Modal>
    </Container>
  );
}

export default App;

