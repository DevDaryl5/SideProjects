from PySide2.QtWidgets import \
     QApplication, QMainWindow, QMessageBox, QPushButton, QLabel, \
     QGridLayout, QWidget
from PySide2.QtGui import QFont
from PySide2 import QtCore


class Connect4Window(QMainWindow):
    NUM_ROWS = 6
    NUM_COLS = 7
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Connect4")
        self.setStyleSheet("background-color: blue;")
        #Counter for turns 
        self.counter = 0
        self.num_buttons_disabled = 0
        #Counter for wins
        self.player1_score = 0
        self.player2_score = 0
        self.draws_score = 0
        layout = QGridLayout()

        #Set buttons & Labels
        self.reset_button = QPushButton("Reset")
        self.draws = QLabel("Draws # 0")
        self.player1 = QLabel("Player1 Wins # 0")
        self.player2 = QLabel("Player2 Wins # 0")
        self.player_turn = QLabel("""Click the "\  /" to Play""")

        #Set Size
        self.player1.setFixedSize(150,40)
        self.player2.setFixedSize(150,40)
        self.draws.setFixedSize(150,40)
        self.player_turn.setFixedSize(300,40)

        #Set Color
        self.reset_button.clicked.connect(self.reset)
        self.draws.setStyleSheet("background-color: White;")
        self.player1.setStyleSheet("background-color: White;") 
        self.player2.setStyleSheet("background-color: White;")
        self.reset_button.setStyleSheet("background-color: None;")
        self.player_turn.setStyleSheet("background-color: White;")
        self.player_turn.setFont(QFont('Arial', 15))

        #Alignment
        self.player_turn.setAlignment(QtCore.Qt.AlignCenter)
        self.player1.setAlignment(QtCore.Qt.AlignCenter)
        self.player2.setAlignment(QtCore.Qt.AlignCenter)
        self.draws.setAlignment(QtCore.Qt.AlignCenter)

        #row of droppers
        self.buttons_list = []
        for col in range(self.NUM_COLS):
            dropper = QPushButton("\\     /")
            dropper.setStyleSheet("background-color: None;")
            layout.addWidget(dropper, 0, col)
            self.buttons_list.append(dropper)
            dropper.clicked.connect(self.dropperPressed)

        # grid of token locations
        self.grid = [[QLabel("") for col in range(self.NUM_COLS)] for row in range(self.NUM_ROWS)]
        for row in range (self.NUM_ROWS):
            for col in range(self.NUM_COLS):
                self.grid[row][col].setFixedSize(100,100)
                self.grid[row][col].resize(80,80)
                self.grid[row][col].setStyleSheet("background-color: Grey; border-radius: 50px;")
                layout.addWidget(self.grid[row][col])
        #Add wigets
        layout.addWidget(self.reset_button,6,7)
        layout.addWidget(self.draws, 3,7)
        layout.addWidget(self.player1, 1,7)
        layout.addWidget(self.player2, 2,7)
        layout.addWidget(self.player_turn,8,2,2,3)
        
        board = QWidget()  
        board.setLayout(layout)
        self.setCentralWidget(board)

    def reset(self):
        dlg = QMessageBox(self)
        dlg.setWindowTitle("Warning")
        dlg.setStyleSheet("background-color: None;")
        dlg.setText("Are you sure you want to reset the game?")
        dlg.setStandardButtons(QMessageBox.Yes | QMessageBox.No)
        button = dlg.exec_()
        clicked_dropper = self.sender()
        if button == QMessageBox.Yes:
            self.ClearBoard()

    def ClearBoard(self):
        for col in range(self.NUM_COLS):
            for row in range (self.NUM_ROWS):
                self.grid[row][col].setText("")
                self.grid[row][col].setStyleSheet("background-color: Grey; border-radius: 50px;")
        for b in self.buttons_list:
            b.setEnabled(True)
        self.counter = 0 
        self.player_turn.setText("""Click the "\  /" to Play""")
        self.player_turn.setStyleSheet(f"background-color : White; color : Black;")
        self.num_buttons_disabled = 0
            
    def play_again(self):
        dlg = QMessageBox(self)
        dlg.setWindowTitle(f"        {self.winning_player} Won !!!")
        dlg.setStyleSheet("background-color: None;")
        dlg.setText("Do you want to play again?")
        dlg.setStandardButtons(QMessageBox.Yes | QMessageBox.No)
        button = dlg.exec_()
        if button == QMessageBox.Yes:
            self.ClearBoard()
    
    def draw_game(self):
        dlg = QMessageBox(self)
        dlg.setWindowTitle(f"        Draw Game !!!")
        dlg.setStyleSheet("background-color: None;")
        dlg.setText("Do you want to play again?")
        dlg.setStandardButtons(QMessageBox.Yes | QMessageBox.No)
        button = dlg.exec_()
        if button == QMessageBox.Yes:
            self.ClearBoard()

    def valid_location(self):
        clickedDropper = self.sender()
        self.indexOfColumn = self.buttons_list.index(clickedDropper)
        self.valid = 5
        for i in range(5):
            if self.grid[self.valid][self.indexOfColumn].text() == "R" or self.grid[self.valid][self.indexOfColumn].text() == "B":
                self.valid -= 1

    def dropperPressed(self):
        clickedDropper = self.sender()
        self.valid_location()
        self.color = "Red"
        if self.counter % 2 ==0:
            self.mark = "R"
            self.color = "Red"
            self.grid[self.valid][self.indexOfColumn].setStyleSheet("background-color: Red; border-radius: 50px; color : Red;")
            self.player_turn.setText("Player 2's Turn")
            self.player_turn.setStyleSheet(f"background-color : Black; color : White;")
        else:
            self.color = "Black"
            self.mark = "B"
            self.grid[self.valid][self.indexOfColumn].setStyleSheet("background-color: Black; border-radius: 50px;")
            self.player_turn.setText("Player 1's Turn")
            self.player_turn.setStyleSheet(f"background-color : Red; color : White;")

        self.grid[self.valid][self.indexOfColumn].setText(self.mark)
        self.counter += 1
        #Check to see if column is full
        if self.grid[0][self.indexOfColumn].text() == "R" or self.grid[0][self.indexOfColumn].text() == "B":
            clickedDropper.setEnabled(False)
            self.num_buttons_disabled += 1
        self.winning_move()

    def winning_move(self):
        #Horizontal Win
        self.winning_player = ""
        self.won = False
        for c in range (self.NUM_COLS-3):
            for r in range (self.NUM_ROWS):
                if self.grid[r][c].text() == self.mark and self.grid[r][c+1].text() == self.mark \
                and self.grid[r][c+2].text() == self.mark and self.grid[r][c+3].text() == self.mark:
                    self.won = True
                    for i in range (4):
                        self.grid[r][c+i].setStyleSheet(f"background-color: {self.color}; color : {self.color}; border :5px solid Blue; border-radius: 50px;")
                    
        #vertical Win
        for c in range (self.NUM_COLS):
            for r in range (self.NUM_ROWS-3):
                if self.grid[r][c].text() == self.mark and self.grid[r+1][c].text() == self.mark \
                and self.grid[r+2][c].text() == self.mark and self.grid[r+3][c].text() == self.mark:
                    self.won = True
                    for i in range (4):
                        self.grid[r+i][c].setStyleSheet(f"background-color: {self.color}; color : {self.color}; border :5px solid Blue; border-radius: 50px;")
                    
        #Negative Slope Win
        for c in range (self.NUM_COLS-3):
            for r in range (self.NUM_ROWS-3):
                if self.grid[r][c].text() == self.mark and self.grid[r+1][c+1].text() == self.mark \
                and self.grid[r+2][c+2].text() == self.mark and self.grid[r+3][c+3].text() == self.mark:
                    self.won = True
                    #for i in range(4):
                    self.grid[r][c].setStyleSheet(f"background-color: {self.color}; color : {self.color}; border :5px solid Blue; border-radius: 50px;")
                    self.grid[r+1][c+1].setStyleSheet(f"background-color: {self.color};color : {self.color};  border :5px solid Blue; border-radius: 50px;")
                    self.grid[r+2][c+2].setStyleSheet(f"background-color: {self.color}; color : {self.color}; border :5px solid Blue; border-radius: 50px;")
                    self.grid[r+3][c+3].setStyleSheet(f"background-color: {self.color}; color : {self.color}; border :5px solid Blue; border-radius: 50px;")

        #Positive Slope Win
        for c in range (self.NUM_COLS-3):
            for r in range (3,self.NUM_ROWS):
                if self.grid[r][c].text() == self.mark and self.grid[r-1][c+1].text() == self.mark \
                and self.grid[r-2][c+2].text() == self.mark and self.grid[r-3][c+3].text() == self.mark:
                    self.won = True
                    self.grid[r][c].setStyleSheet(f"background-color: {self.color}; color : {self.color}; border :5px solid Blue; border-radius: 50px;")
                    self.grid[r-1][c+1].setStyleSheet(f"background-color: {self.color};color : {self.color};  border :5px solid Blue; border-radius: 50px;")
                    self.grid[r-2][c+2].setStyleSheet(f"background-color: {self.color}; color : {self.color}; border :5px solid Blue; border-radius: 50px;")
                    self.grid[r-3][c+3].setStyleSheet(f"background-color: {self.color}; color : {self.color}; border :5px solid Blue; border-radius: 50px;")

        if self.won == True:
            for b in self.buttons_list:
               b.setEnabled(False)
            if self.mark == "R":
                self.player1_score += 1
                self.player1.setText(f"Player1 Wins # {self.player1_score}")
                self.winning_player = "Player 1"
            else:
                self.player2_score += 1
                self.player2.setText(f"Player2 Wins # {self.player2_score}")
                self.winning_player = "Player 2"
            self.play_again()
        #check for draws
        if self.num_buttons_disabled >= 7:
            self.draws_score += 1
            self.draws.setText(f"Draws # {self.draws_score}")
            self.draw_game()

if __name__ == "__main__":
    import doctest
    doctest.testmod()
app = QApplication()
win = Connect4Window()
win.show()
app.exec_()