import { Link } from 'react-router-dom'
import React from 'react';
import { Button } from 'react-bootstrap'
import { Card } from '@material-ui/core';
import { Grid } from "@material-ui/core";

const Publicaciones = ({ publicaciones }) => {

  return (
    <Grid
      container
      spacing={4}
      className="blog-list"
      style={{ marginTop: "80px" }}
    >
      {publicaciones.map(publicacion => (
        <Grid key={publicacion} item xs={12} sm={6} md={4}>
            <div className="blog-preview" key={publicacion.id} >
                <Link to={`/publicacion/${publicacion.id}`}>
                      <div className="card">
                      <img className="imagen_card" src={publicacion.imagen}/>
                      <div className="container">
                        <h4>Autor: <b>{publicacion.usuario}</b></h4>
                        <p>Título: {publicacion.titulo}</p>
                      </div>
                    </div>
                </Link>
            </div>
        </Grid>
      ))}
    </Grid>
  );
}

export default Publicaciones;