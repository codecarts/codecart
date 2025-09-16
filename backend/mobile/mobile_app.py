import kivy
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.button import Button
from kivy.uix.scrollview import ScrollView
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.network.urlrequest import UrlRequest
from kivy.core.window import Window
from kivy.utils import get_color_from_hex

# --- Configuration ---
BASE_API_URL = "https://codecart-backend.onrender.com/api"
PRIMARY_DARK = "#0A2540"
PRIMARY_TEXT = "#333745"
BACKGROUND_LIGHT = "#f7fafc" # Light background for the main area
WHITE_TEXT = "#FFFFFF"

# Set the window background color directly
Window.clearcolor = get_color_from_hex(BACKGROUND_LIGHT)

# --- Styled Widgets ---
class StyledButton(Button):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.background_normal = ''
        self.background_color = get_color_from_hex(PRIMARY_DARK) # Dark blue button
        self.color = get_color_from_hex(WHITE_TEXT) # White text
        self.font_size = '16sp'
        self.bold = True

# --- Reusable Content Screen ---
class ContentScreen(Screen):
    def __init__(self, endpoint, title, **kwargs):
        super().__init__(**kwargs)
        self.endpoint = endpoint
        self.title_text = title
        
        layout = BoxLayout(orientation='vertical', padding=20, spacing=10)
        
        title_label = Label(
            text=self.title_text,
            font_size='28sp',
            size_hint_y=None,
            height=50,
            bold=True,
            color=get_color_from_hex(PRIMARY_DARK)
        )
        layout.add_widget(title_label)

        scroll_view = ScrollView()
        self.content_list = BoxLayout(orientation='vertical', size_hint_y=None, spacing=10)
        self.content_list.bind(minimum_height=self.content_list.setter('height'))
        scroll_view.add_widget(self.content_list)
        layout.add_widget(scroll_view)
        
        self.add_widget(layout)
        
    def on_enter(self):
        self.fetch_content()

    def fetch_content(self):
        self.content_list.clear_widgets()
        self.content_list.add_widget(Label(text=f'Loading {self.title_text}...', color=get_color_from_hex(PRIMARY_TEXT)))
        
        full_url = f"{BASE_API_URL}/{self.endpoint}"
        UrlRequest(full_url, on_success=self.on_success, on_error=self.on_error)

    def on_success(self, request, result):
        self.content_list.clear_widgets()
        
        if not result:
            self.content_list.add_widget(Label(text=f'No {self.title_text} found.', color=get_color_from_hex(PRIMARY_TEXT)))
            return

        for item in result:
            title = item.get('subject') or item.get('name') or item.get('title', 'No Title')
            
            card_label = Label(
                text=f"[b]{title}[/b]",
                markup=True,
                color=get_color_from_hex(PRIMARY_DARK),
                size_hint_y=None,
                height=60,
                padding=(15, 15)
            )
            self.content_list.add_widget(card_label)

    def on_error(self, request, error):
        self.content_list.clear_widgets()
        self.content_list.add_widget(Label(text=f'Failed to load {self.title_text}.', color=(1,0,0,1)))


# --- Main Application ---
class CodecartApp(App):
    def build(self):
        root = BoxLayout(orientation='vertical')
        
        sm = ScreenManager()
        sm.add_widget(ContentScreen(name='notes', endpoint='notes', title='Notes'))
        sm.add_widget(ContentScreen(name='pyqs', endpoint='pyqs', title='PYQs'))
        sm.add_widget(ContentScreen(name='blogs', endpoint='blogs', title='Blogs'))
        sm.add_widget(ContentScreen(name='products', endpoint='products', title='Products'))
        
        nav_bar = BoxLayout(size_hint_y=None, height=60)
        
        btn_notes = StyledButton(text='Notes', on_press=lambda x: setattr(sm, 'current', 'notes'))
        btn_pyqs = StyledButton(text='PYQs', on_press=lambda x: setattr(sm, 'current', 'pyqs'))
        btn_blogs = StyledButton(text='Blogs', on_press=lambda x: setattr(sm, 'current', 'blogs'))
        btn_products = StyledButton(text='Products', on_press=lambda x: setattr(sm, 'current', 'products'))
        
        nav_bar.add_widget(btn_notes)
        nav_bar.add_widget(btn_pyqs)
        nav_bar.add_widget(btn_blogs)
        nav_bar.add_widget(btn_products)
        
        root.add_widget(sm)
        root.add_widget(nav_bar)
        
        return root

if __name__ == '__main__':
    CodecartApp().run()