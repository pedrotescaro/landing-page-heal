<?php
    namespace src\routes;   

    class Routes{
        private $routes =[];

        public function add($method,$path,$action){
            $this->routes[] = [
                'method'=> $method,
                'path'=> $path,
                'action'=>$action
            ];
        }

        public function handlerRequest(){
            $method = $_SERVER['REQUEST_METHOD'];

            $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

            foreach($this->routes as $r){
                if($r['method'] == $method && $r['path']==$path){

                    call_user_func($r['action']);
                    return;
                }
            }
            http_response_code(404);
             json_encode(['erro' => 'Rota não encontrada']);
        }
    }