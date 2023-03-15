import React, { useState, useRef } from 'react';
import './App.css';
import GymJob from './GymJob';
import {
  BrowserRouter,
  Routes,
  Route,
  useRoutes
} from 'react-router-dom'
import { Home } from './Home';
import { Iframe } from './Iframe';
import { View } from './View';
import { PageNotFound } from './PageNotFound';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { ThreeEvent, useFrame, useThree} from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, PerspectiveCamera } from '@react-three/drei'
import { Vector3, Plane} from 'three';

export function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
  setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const player = useRef({position: new Vector3(0.0, 0.0, 0.0), rotation: new Vector3(0.0, 0.0, 0.0)});
  player.current.position.set(-28, 0, -17);
  player.current.rotation.set(0, Math.PI/2, 0);
  const [pathIndex, setPathIndex] = useState(0);
  
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <ModalsProvider>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
              <Route index element={<View player={player} pathIndex={pathIndex} setPathIndex={setPathIndex}/>} />
              <Route path="/iframe/:id" element={<Iframe />} />
              <Route path="/gymjob" element={<GymJob />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}