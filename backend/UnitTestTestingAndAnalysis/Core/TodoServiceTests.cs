using System;
using FS.Todo.Core.Services;
using FS.Todo.Data.Interfaces;
using FS.Todo.Core.Models;
using NSubstitute;
using Xunit;

namespace FS.Todo.Tests.Core
{
    public class TodoServiceTests
    {
        [Fact]
        public async void CreateTodo_Throws_ArgumentNullException_When_TodoModel_IsNull()
        {
            // Arrange
            var todoRepository = Substitute.For<ITodoRepository>();
            var todoService = new TodoService(todoRepository);

            // Act & Assert
            await Assert.ThrowsAsync<ArgumentNullException>(() => todoService.CreateTodoAsync(null));
        }

        [Fact]
        public async void CreateTodo_Returns_Created_TodoModel()
        {
            // Arrange
            var todoRepository = Substitute.For<ITodoRepository>();
            var todoService = new TodoService(todoRepository);

            var todoModel = new TodoModel
            {
                Description = "test todo",
                IsCompleted = false
            };

            var todoEntity = new FS.Todo.Data.Entities.Todo
            {
                Id = Guid.NewGuid(),
                Description = "test todo",
                IsCompleted = false,
            };

            todoRepository.AddAsync(Arg.Any<FS.Todo.Data.Entities.Todo>()).Returns(todoEntity);

            // Act
            var createdTodo = await todoService.CreateTodoAsync(todoModel);

            // Assert
            Assert.Equal(todoEntity.Id, createdTodo.Id);
            Assert.Equal(todoEntity.Description, createdTodo.Description);
            Assert.Equal(todoEntity.IsCompleted, createdTodo.IsCompleted);
        }

        [Fact]
        public async void GetTodo_Returns_Null_When_Todo_IsNotFound()
        {
            // Arrange
            var todoRepository = Substitute.For<ITodoRepository>();
            var todoService = new TodoService(todoRepository);

            var todoId = Guid.NewGuid();
            todoRepository.FindAsync(todoId).Returns((FS.Todo.Data.Entities.Todo)null);

            // Act
            var todo = await todoService.GetTodoAsync(todoId);

            // Assert
            Assert.Null(todo);
        }

        [Fact]
        public async void GetTodo_Maps_Entity_To_TodoModel_Correctly()
        {
            // Arrange
            var todoRepository = Substitute.For<ITodoRepository>();
            var todoService = new TodoService(todoRepository);

            var todoId = Guid.NewGuid();
            var todoEntity = new FS.Todo.Data.Entities.Todo
            {
                Id = todoId,
                Description = "test todo",
                IsCompleted = false,
            };

            todoRepository.FindAsync(todoId).Returns(todoEntity);

            // Act
            var todo = await todoService.GetTodoAsync(todoId);

            // Assert
            Assert.Equal(todoEntity.Id, todo.Id);
            Assert.Equal(todoEntity.Description, todo.Description);
            Assert.Equal(todoEntity.IsCompleted, todo.IsCompleted);
        }

       
    }
}
