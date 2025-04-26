######################################
# Welcome to AIエディタCursor完全ガイド #
######################################

'''
ステップ 1: ⌘+K または Ctrl+K を新しい行で使用して、CLIベースの三目並べゲームを生成してみてください。

ステップ2: ⌘+L または Ctrl+L を押してチャットを開き、コードの機能について尋ねる。
   - その後、コードを実行してみる。

ステップ3: マウスで全てのコードをハイライトし、⌘+K または Ctrl+K を押す。
   - 何かしらの変更を加えるように指示する（例:色を追加、スタート画面を追加、3x3から4x4に変更するなど）。

ステップ4: 「ファイル」メニューの「フォルダーを開く...」から自分のプロジェクトを開いて Cursor を試してみてください。
'''
import tkinter as tk
from tkinter import messagebox
# 音楽再生用
import pygame
import os

# 盤面の状態を管理するクラス
class TicTacToeGUI:
    def __init__(self, master):
        self.master = master
        master.title("三目並べゲーム（Tkinter版）")
        self.current_player = "X"
        self.board = [" "] * 9
        self.buttons = []
        self.sounds = {}
        self.init_sounds()
        self.create_widgets()
        self.play_start_music()
        self.show_instructions()

    def init_sounds(self):
        try:
            pygame.mixer.init()
            # 効果音ファイルのロード
            base = os.path.dirname(__file__)
            start_path = os.path.join(base, "start.wav")
            click_path = os.path.join(base, "click.wav")
            if os.path.exists(start_path):
                self.sounds['start'] = pygame.mixer.Sound(start_path)
            if os.path.exists(click_path):
                self.sounds['click'] = pygame.mixer.Sound(click_path)
        except Exception:
            self.sounds = {}

    def play_start_music(self):
        try:
            if 'start' in self.sounds:
                self.sounds['start'].play()
        except Exception:
            pass

    def play_click_sound(self):
        try:
            if 'click' in self.sounds:
                self.sounds['click'].play()
        except Exception:
            pass

    def show_instructions(self):
        message = (
            "【遊び方】\n"
            "・2人で交互にマスを選び、XとOを置いていきます。\n"
            "・縦・横・斜めのいずれか1列に自分のマークを3つ並べたら勝ちです。\n"
            "・空いているマスをクリックしてください。\n"
            "・すべてのマスが埋まったら引き分けです。"
        )
        messagebox.showinfo("三目並べゲームへようこそ！", message)

    def create_widgets(self):
        frame = tk.Frame(self.master)
        frame.pack()
        for i in range(9):
            btn = tk.Button(frame, text=" ", width=6, height=3, font=("Arial", 24),
                            command=lambda idx=i: self.on_click(idx))
            btn.grid(row=i//3, column=i%3)
            self.buttons.append(btn)
        self.status_label = tk.Label(self.master, text="プレイヤー X の番です", font=("Arial", 16))
        self.status_label.pack(pady=10)
        self.reset_button = tk.Button(self.master, text="リセット", command=self.reset_game, font=("Arial", 18), width=10, height=2)
        self.reset_button.pack(pady=10)

    def on_click(self, idx):
        if self.board[idx] == " " and not self.check_winner()[0]:
            self.play_click_sound()
            self.board[idx] = self.current_player
            self.buttons[idx]["text"] = self.current_player
            winner, reason = self.check_winner()
            if winner:
                self.status_label["text"] = f"プレイヤー {winner} の勝利です！"
                message = f"プレイヤー {winner} の勝利です！\n理由: {reason}"
                messagebox.showinfo("ゲーム終了", message)
            elif self.is_board_full():
                self.status_label["text"] = "引き分けです！"
                messagebox.showinfo("ゲーム終了", "引き分けです！")
            else:
                self.current_player = "O" if self.current_player == "X" else "X"
                self.status_label["text"] = f"プレイヤー {self.current_player} の番です"

    def check_winner(self):
        b = self.board
        # 横
        for i in range(0, 9, 3):
            if b[i] == b[i+1] == b[i+2] != " ":
                return b[i], f"{i//3+1}行目を揃えました"
        # 縦
        for i in range(3):
            if b[i] == b[i+3] == b[i+6] != " ":
                return b[i], f"{i+1}列目を揃えました"
        # 斜め
        if b[0] == b[4] == b[8] != " ":
            return b[0], "左上から右下の斜めを揃えました"
        if b[2] == b[4] == b[6] != " ":
            return b[2], "右上から左下の斜めを揃えました"
        return None, None

    def is_board_full(self):
        return " " not in self.board

    def reset_game(self):
        self.board = [" "] * 9
        for btn in self.buttons:
            btn["text"] = " "
        self.current_player = "X"
        self.status_label["text"] = "プレイヤー X の番です"

if __name__ == "__main__":
    root = tk.Tk()
    app = TicTacToeGUI(root)
    root.mainloop()
