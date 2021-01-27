import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { AddTask } from '../components/AddTask';
import { useProjectsValue, useSelectedProjectValue } from '../contexts';
import { ProjectOverlay } from '../components/ProjectOverlay';
beforeEach(cleanup); 

jest.mock('../contexts', () => ({
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: "MUSIC",
        projectId: '1',
        userId: 'testuserid',
        docId: "JZCX8LBSMIS0pYQWwTvl"
      }
    ]
  }))
}))

describe('<ProjectOverlay', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('Success', () => {
    it('renders the project overlay and calls setShowProjectOverlay using onCLick', () => {
      
      const showProjectOverlay = true
      const setProject = jest.fn()
      const setShowProjectOverlay = jest.fn(() => {
        !showProjectOverlay
      })

      const {queryByTestId } = render (
        <ProjectOverlay 
          showProjectOverlay
          setProject= {setProject}
          setShowProjectOverlay={setShowProjectOverlay}
        />
      )
      
      expect(queryByTestId('project-overlay')).toBeTruthy();
      fireEvent.click(queryByTestId('project-overlay-action'))
      expect(setProject).toHaveBeenCalled()
    })

    it('renders the project overlay and calls setShowProjectOverlay using keydown', () => {
      const showProjectOverlay = true
      const setProject = jest.fn()
      const setShowProjectOverlay = jest.fn(() => {
        !showProjectOverlay
      })

      const {queryByTestId } = render (
        <ProjectOverlay 
          showProjectOverlay
          setProject= {setProject}
          setShowProjectOverlay={setShowProjectOverlay}
        />
      )
      
      expect(queryByTestId('project-overlay')).toBeTruthy();
      fireEvent.keyDown(queryByTestId('project-overlay-action'))
      expect(setProject).toHaveBeenCalled()
    })


  })
  describe("Failure", () => {
    it('does not render the project overlya with any projects', () => {
      useProjectsValue.mockImplementation(() => ({
        projects: []
      }))

      const { queryByTestId } = render(<ProjectOverlay showProjectOverlay/>)
      expect(queryByTestId('project-overlay')).toBeTruthy()
      expect(queryByTestId('project-overlay-action')).toBeFalsy()
    })
  })
  

  
})