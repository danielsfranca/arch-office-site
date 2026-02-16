'use server';

import { promises as fs } from 'fs';
import path from 'path';

const BASE_PROJECTS_PATH = 'e:\\SERVIDOR\\PROJETOS';

export async function createProjectStructure(clientName: string, projectName: string) {
  // Sanitize names to be safe for file system
  const safeClient = clientName.replace(/[^a-z0-9]/gi, '_').toUpperCase();
  const safeProject = projectName.replace(/[^a-z0-9]/gi, '_').toUpperCase();
  const folderName = `${safeProject}_${safeClient}`;

  const projectPath = path.join(BASE_PROJECTS_PATH, folderName);

  // Directory structure from Module 7
  const subfolders = [
    '00_BRIEFING',
    '01_BASE_CAD',
    '02_MODELO_3D',
    '03_REFERENCIAS',
    '04_TESTES',
    '05_RENDER_FINAL',
    '06_ENTREGA'
  ];

  try {
    // Ensure base directory exists
    try {
      await fs.access(BASE_PROJECTS_PATH);
    } catch {
      await fs.mkdir(BASE_PROJECTS_PATH, { recursive: true });
    }

    // Create project root
    await fs.mkdir(projectPath, { recursive: true });

    // Create subfolders
    for (const folder of subfolders) {
      await fs.mkdir(path.join(projectPath, folder), { recursive: true });
    }

    return { success: true, message: `Projeto criado em: ${projectPath}`, path: projectPath };
  } catch (error: any) {
    console.error("Error creating project structure:", error);
    return { success: false, message: `Erro ao criar pastas: ${error.message}` };
  }
}

export async function saveDocument(clientName: string, projectName: string, folder: string, filename: string, content: string) {
  const safeClient = clientName.replace(/[^a-z0-9]/gi, '_').toUpperCase();
  const safeProject = projectName.replace(/[^a-z0-9]/gi, '_').toUpperCase();
  const folderName = `${safeProject}_${safeClient}`;

  const filePath = path.join(BASE_PROJECTS_PATH, folderName, folder, filename);

  try {
    await fs.writeFile(filePath, content, 'utf-8');
    return { success: true, message: `Arquivo salvo: ${filename}` };
  } catch (error: any) {
    return { success: false, message: `Erro ao salvar arquivo: ${error.message}` };
  }
}

export async function generateSketchupPlugin(clientName: string, projectName: string) {
  const safeClient = clientName.replace(/[^a-z0-9]/gi, '_').toUpperCase();
  const safeProject = projectName.replace(/[^a-z0-9]/gi, '_').toUpperCase();
  const folderName = `${safeProject}_${safeClient}`;

  const rubyCode = `
# Daniel França Arquitetura - Project Automation Plugin
# Generated for project: ${projectName}

require 'sketchup.rb'

module DFArchAutomation
  PROJECT_PATH = "E:/SERVIDOR/PROJETOS/${folderName}"
  
  def self.setup_paths
    model = Sketchup.active_model
    
    # Define paths
    base_3d = File.join(PROJECT_PATH, "02_MODELO_3D")
    
    # Prompt to save if not saved
    if model.path.empty?
      filename = "${safeProject}_V01.skp"
      full_path = File.join(base_3d, filename)
      
      choice = UI.messagebox("Deseja salvar este arquivo na pasta do projeto correta?\\n#{full_path}", MB_YESNO)
      
      if choice == IDYES
        # Create directory if it doesn't exist (Ruby fallback)
        Dir.mkdir(PROJECT_PATH) unless File.exist?(PROJECT_PATH)
        Dir.mkdir(base_3d) unless File.exist?(base_3d)
        
        model.save(full_path)
        UI.messagebox("Arquivo salvo com sucesso em: #{full_path}")
      end
    else
      UI.messagebox("Arquivo já está salvo: #{model.path}")
    end
  end

  # Create Menu
  unless file_loaded?(__FILE__)
    menu = UI.menu('Plugins')
    sub = menu.add_submenu('DF Arquitetura')
    sub.add_item('Salvar no Projeto Atual') {
      self.setup_paths
    }
    file_loaded(__FILE__)
  end
end
`;
  return rubyCode;
}
