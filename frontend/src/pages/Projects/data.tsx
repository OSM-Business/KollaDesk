import type { ReactNode } from 'react';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';

export interface Project {
  id: string;
  name: string;
}

export interface Gewerk {
  id: string;
  projectId: string;
  name: string;
}

// Dokumentkategorien pro Gewerk – abgeleitet aus der Kernfunktion:
// Positionen aus LV und Teilrechnungen, Abgleich gegen Aufmaß.
export type KategorieId = 'lv' | 'rechnungen' | 'aufmass';

export interface Kategorie {
  id: KategorieId;
  label: string;
  icon: ReactNode;
}

export const projects: Project[] = [
  { id: 'p1', name: 'Wohnpark Donaufeld' },
  { id: 'p2', name: 'Gewerbepark Süd' },
  { id: 'p3', name: 'Sanierung Hauptstraße 12' },
  { id: 'p4', name: 'Brückensanierung Mühlau' },
];

export const gewerke: Gewerk[] = [
  { id: 'g1', projectId: 'p1', name: 'Rohbau' },
  { id: 'g2', projectId: 'p1', name: 'Elektroinstallation' },
  { id: 'g3', projectId: 'p1', name: 'Sanitär & Heizung' },
  { id: 'g4', projectId: 'p1', name: 'Fenster & Fassade' },
  { id: 'g5', projectId: 'p2', name: 'Rohbau' },
  { id: 'g6', projectId: 'p2', name: 'Elektroinstallation' },
  { id: 'g7', projectId: 'p3', name: 'Sanitär & Heizung' },
  { id: 'g8', projectId: 'p4', name: 'Rohbau' },
];

export const kategorien: Kategorie[] = [
  { id: 'lv', label: 'Leistungsverzeichnis', icon: <FactCheckOutlinedIcon /> },
  { id: 'rechnungen', label: 'Rechnungen', icon: <ReceiptLongOutlinedIcon /> },
  { id: 'aufmass', label: 'Aufmaßblätter', icon: <StraightenOutlinedIcon /> },
];
// Für die Baum-Ansicht: die gesamte Hierarchie einmal vorab zu Knoten aufbauen.
export interface TreeNode {
  id: string;
  label: string;
  icon: ReactNode;
  path: string;
  children?: TreeNode[];
}

export const projectTree: TreeNode[] = projects.map((project) => ({
  id: project.id,
  label: project.name,
  icon: <FolderOutlinedIcon />,
  path: `/projects/${project.id}`,
  children: gewerke
    .filter((gewerk) => gewerk.projectId === project.id)
    .map((gewerk) => ({
      id: gewerk.id,
      label: gewerk.name,
      icon: <EngineeringOutlinedIcon />,
      path: `/projects/${project.id}/${gewerk.id}`,
      children: kategorien.map((kategorie) => ({
        id: kategorie.id,
        label: kategorie.label,
        icon: kategorie.icon,
        path: `/projects/${project.id}/${gewerk.id}/${kategorie.id}`,
      })),
    })),
}));
