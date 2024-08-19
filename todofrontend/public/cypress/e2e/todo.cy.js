describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should add a new todo', () => {
    const todoText = 'New Todo';
    cy.get('.todo-input').type(todoText);
    cy.get('.todo-btn').click();
    cy.contains('.Todo p', todoText).should('exist');
  });

  it('should mark a todo as completed', () => {
    const todoText = 'New Todo';
    cy.get('.todo-input').type(todoText);
    cy.get('.todo-btn').click();
    cy.contains('.Todo p', todoText).click();
    cy.contains('.Todo p', todoText).should('have.class', 'completed');
  });

  it('should delete a todo', () => {
    const todoText = 'New Todo';
    cy.get('.todo-input').type(todoText);
    cy.get('.todo-btn').click();
    cy.contains('.Todo p', todoText)
      .siblings('div')
      .find('.fa-trash')
      .click()
      .should('not.exist');
  });

  it('should edit a todo', () => {
    const todoText = 'New Todo';
    const editedTodoText = 'Edited Todo';
    cy.get('.todo-input').type(todoText);
    cy.get('.todo-btn').click();
    cy.contains('.Todo p', todoText)
      .siblings('div')
      .find('.fa-pen-square')
      .click();

    cy.get('.TodoForm input').clear().type(editedTodoText);
    cy.get('.TodoForm button').click();

    cy.contains('.Todo p', editedTodoText).should('exist');
  });

  it('should mark a completed todo as incomplete', () => {
    const todoText = 'New Todo';
    cy.get('.todo-input').type(todoText);
    cy.get('.todo-btn').click();
    cy.contains('.Todo p', todoText).click();
    cy.contains('.Todo p', todoText).should('have.class', 'completed');
    cy.contains('.Todo p', todoText).click();
    cy.contains('.Todo p', todoText).should('not.have.class', 'completed');
  });

  it('should persist todos after page reload', () => {
    const todoText1 = 'Todo 1';
    const todoText2 = 'Todo 2';
    cy.get('.todo-input').type(todoText1);
    cy.get('.todo-btn').click();
    cy.get('.todo-input').type(todoText2);
    cy.get('.todo-btn').click();

    cy.reload();

    cy.contains('.Todo p', todoText1).should('exist');
    cy.contains('.Todo p', todoText2).should('exist');
  });

  it('should clear all completed todos', () => {
    const todoText1 = 'Todo 1';
    const todoText2 = 'Todo 2';
    const todoText3 = 'Todo 3';
    cy.get('.todo-input').type(todoText1);
    cy.get('.todo-btn').click();
    cy.get('.todo-input').type(todoText2);
    cy.get('.todo-btn').click();
    cy.get('.todo-input').type(todoText3);
    cy.get('.todo-btn').click();

    cy.contains('.Todo p', todoText2).click();
    cy.contains('.Todo p', todoText3).click();

    cy.contains('.clear-btn', 'Clear Completed').click();

    cy.contains('.Todo p', todoText2).should('not.exist');
    cy.contains('.Todo p', todoText3).should('not.exist');

    cy.contains('.Todo p', todoText1).should('exist');
  });

  it('should clear the input field after adding a todo', () => {
    const todoText = 'New Todo';
    cy.get('.todo-input').type(todoText);
    cy.get('.todo-btn').click();
    cy.get('.todo-input').should('have.value', '');
  });

  it('should clear the input field after editing a todo', () => {
    const todoText = 'New Todo';
    const editedTodoText = 'Edited Todo';
    cy.get('.todo-input').type(todoText);
    cy.get('.todo-btn').click();
    cy.contains('.Todo p', todoText)
      .siblings('div')
      .find('.fa-pen-square')
      .click();

    cy.get('.TodoForm input').clear().type(editedTodoText);
    cy.get('.TodoForm button').click();

    cy.get('.todo-input').should('have.value', '');
  });
});
