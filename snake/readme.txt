Num dia tive um insight que facilitaria o "problema do jogo da cobrinha"

O problema discutido com meus amigos, há muito tempo atrás, era apenas lidar com a cabeça e a cauda da cobra em uma estrutura de dados que seria uma 
coleção de coordenadas, mas sem ter que redefinir uma nova coleção denovo a cada movimento da cobra (a única maneira que nós tinhamos encontrado no
 momento, era burro e anti-performance) 
Aí descobrimos a função mágica do javascript Array.protoype.shift() que remove o primeiro elemento de um array, e de repente em uma única tarde eu
consegui fazer o jogo da cobrinha sem muitas dificuldades.

Use W, A, S e D para controlar a cobrinha, e R para reiniciar quando morrer.

