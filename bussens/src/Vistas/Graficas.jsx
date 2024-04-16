import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { db } from "../firebase/Confi";
import accessibility from 'highcharts/modules/accessibility';
import { getDistance } from 'geolib';
import { useLocation } from 'react-router-dom';

accessibility(Highcharts);
function Graficas () 
{
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const clave = parseInt(searchParams.get('clave'), 10);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [distance, setDistance] = useState([]);
    const fetchDocuments = async () => {
      const collectionRef = collection(db, 'Lecturas-2');
      const orderedQuery = query(collectionRef, where('clave_vehiculo', '==', clave), orderBy('tiempo'));
  
      const snapshot = await getDocs(orderedQuery);
      const documents = snapshot.docs.map((doc) => doc.data());
  
      const filteredDocuments = [documents[0]]; // Agregar el primer documento más reciente
  
      for (let i = 1; i < documents.length; i++) {
        const currentDocument = documents[i];
        const previousDocument = filteredDocuments[filteredDocuments.length - 1];
  
        const currentTimestamp = currentDocument.tiempo.toDate();
        const previousTimestamp = previousDocument.tiempo.toDate();
  
        const diffInMinutes = Math.abs(currentTimestamp - previousTimestamp) / (1000 * 60);
  
        if (diffInMinutes >= 5) {
          filteredDocuments.push(currentDocument);
        }
  
        if (filteredDocuments.length === 5) {
          break; // Se han obtenido los 5 documentos necesarios
        }
      }
  
      setData(filteredDocuments);
      setLoading(false);
    };
  
    useEffect(() => {
      fetchDocuments();
    }, [clave]);
  
    useEffect(() => {
      if (!loading) {
        const distances = calculateDistances(data);
        setDistance(distances);
        //console.log(distance);
      }
    }, [data, loading]);
  
    const calculateDistances = (data) => {
      const distances = [];
  
      for (let i = 0; i < data.length - 1; i++) {
        const point1 = { latitude: data[i].coordenadas._lat, longitude: data[i].coordenadas._long };
        const point2 = { latitude: data[i + 1].coordenadas._lat, longitude: data[i + 1].coordenadas._long };
  
        const distance = getDistance(point1, point2);
        distances.push(distance);
      }
  
      return distances;
    };
  
    if (loading) {
      console.log('cargando');
    }else{
      console.log(distance);
    }

    
/*
    const fetchDocuments = async () => {
      const collectionRef = collection(db, 'Lecturas-2');
      const orderedQuery = query(collectionRef, where('clave_vehiculo', '==', 3), orderBy('tiempo'));
    
      const snapshot = await getDocs(orderedQuery);
      const documents = snapshot.docs.map((doc) => doc.data());
    
      const filteredDocuments = [documents[0]]; // Agregar el primer documento más reciente
    
      for (let i = 1; i < documents.length; i++) {
        const currentDocument = documents[i];
        const previousDocument = filteredDocuments[filteredDocuments.length - 1];
    
        const currentTimestamp = currentDocument.tiempo.toDate();
        const previousTimestamp = previousDocument.tiempo.toDate();
    
        const diffInMinutes = Math.abs(currentTimestamp - previousTimestamp) / (1000 * 60);
    
        if (diffInMinutes >= 5) {
          filteredDocuments.push(currentDocument);
        }
    
        if (filteredDocuments.length === 5) {
          break; // Se han obtenido los 5 documentos necesarios
        }
      }
    
      setData(filteredDocuments);
      setLoading(false);
    };

    useEffect(() => {
      fetchDocuments();
    }, []);
    const calculateDistances = (data) => {
      const distances = [];
      
      for (let i = 0; i < data.length - 1; i++) {
        const point1 = { latitude: data[i].coordenadas._lat, longitude: data[i].coordenadas._long };
        const point2 = { latitude: data[i + 1].coordenadas._lat, longitude: data[i + 1].coordenadas._long };
        
        const distance = getDistance(point1, point2);
        distances.push(distance);
      }
      
      return distances;
    };

    if(loading){
      console.log('cargando');
    }else{
      const distances = calculateDistances(data);
      setDistance(distances);
      console.log(distances);
    }*/

    

      const getOptions = () => {
        const processedData = distance.map((dist, index) => {
          return { x: (index + 1) * 5, y: dist }; // 'x' es el tiempo en minutos, que aumenta en 5 en cada iteración
        });
    
        return {
          chart: {
            type: 'area', // Cambia 'area' a 'line' para una gráfica de línea
          },
          title: {
            text: 'Distancia cada 5 minutos',
          },
          xAxis: {
            title: {
              text: 'Tiempo (minutos)', // Cambia 'Tiempo' a 'Tiempo (minutos)'
            },
            tickInterval: 5, // Intervalos de 5 minutos
          },
          yAxis: {
            title: {
              text: 'Distancia', // Cambia 'Coordenadas' a 'Distancia'
            },
            min: 0, // Cambia a tu valor mínimo de distancia
            max: 10000, // Cambia a tu valor máximo de distancia
          },
          series: [
            {
              name: 'Distancia',
              data: processedData,
              marker: {
                symbol: 'circle',
              },
            },
          ],
        };
      };
    
      return (
        <div>
          <HighchartsReact highcharts={Highcharts} options={getOptions()} />
        </div>
      );
    };

export default Graficas;